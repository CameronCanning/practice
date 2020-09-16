import document from 'document';
import clock from 'clock';
import exercise from 'exercise';
import { vibration } from 'haptics';
import { centerPlayButton, toString, msToMinSec } from '../helper';
import { buttons, next } from 'fitbit-views';

//TODO-fix: don't track time if passed
export default (timerSettings) => {
    let timerLabel = document.getElementById('timer');
    let playButton = document.getElementById('play-button'); 
    let playImage = document.getElementById('play-image');
    let playSection = document.getElementById('play-button-section');
    let pauseSection = document.getElementById('pause-section');
    let finishButton = document.getElementById('finish-button');

    centerPlayButton(playSection, playImage);

    //let duration = (timerSettings.duration == 0) ? 0 : timerSettings.duration * 60 * 1000;
    let duration = (timerSettings.duration == 0) ? 0 :   3000;
    let intervals = timerSettings.intervals;
    let toCountup = null;
    let durationFinished = false;
    let timeFinished = 0;

    let play = () => {
        exercise.resume();
        playImage.image = 'icons\\btn_combo_pause_press_p.png';
        clock.granularity = 'seconds';
        pauseSection.style.display = 'none';
    }

    let pause = () => {
        exercise.pause();
        playImage.image = 'icons\\btn_combo_play_press_p.png';
        clock.granularity = 'off';
        pauseSection.style.display = 'inline';
    }
   
    let timerFinished = () => {
        if (durationFinished){
            return false;
        }
        else if (duration){
            if (duration <= exercise.stats.activeTime) {
                durationFinished = true;
                return true;
            }
            return false;
        }
        return false;
    }

    let updateTimer = () => {
        let timerValue = (duration) ? duration - exercise.stats.activeTime : exercise.stats.activeTime;
        if (timerValue < 0) timerValue = 0;
        let [m, s] = msToMinSec(timerValue);
        timerLabel.text = toString([m, s]);
    } 

    playButton.onclick = () => {
        (exercise.state === 'started') ? pause() : play();
    }

    finishButton.onclick = () => {
        clock.granularity = 'off';
        clearTimeout(toCountup);
        next('timer_finish', timerSettings);
    }

    //TODO: prompt are you sure
    buttons.back = () => {
        clock.granularity = 'off';
        exercise.stop();
        next('setup', timerSettings);
    }
    
    clock.ontick = () => {
        updateTimer();
        if (timerFinished()){
            console.log('nudge-max');
            vibration.start('nudge-max');
            playSection.style.display = 'none';
            pauseSection.style.display = 'inline';
            //after 10 seconds start counting up
            toCountup  = setTimeout(() => {
                duration = 0;
                durationFinished = false;
                playSection.style.display = 'inline';
                pauseSection.style.dispaly = 'none';
            }, 10000);
        }
    }

    exercise.start(timerSettings.activity);
    updateTimer();
    clock.granularity = 'seconds';
}
