import document from 'document';
import clock from 'clock';
import exercise from 'exercise';
import { vibration } from 'haptics';
import { centerPlayButton } from '../helper';
import { buttons, back, next } from 'fitbit-views';

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
    let msToMinSec = (ms) => {
        let s = Math.floor(ms/1000);
        let m = Math.floor(s/60);
        s = s - (m*60);
        return [m, s];
    }

    let toString = ([m, s]) => {
        if (s < 10) s = `0${s}`;
        console.log(`${m}:${s}`);
        return `${m}:${s}`;
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
            //return (duration <= exercise.stats.activeTime) ? true : false;
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
            //after 10 seconds start counting up
            toCountup  = setTimeout(() => {
                duration = 0;
                durationFinished = false;
            }, 10000);
        }
    }

    exercise.start(timerSettings.activity);
    updateTimer();
    clock.granularity = 'seconds';
}
