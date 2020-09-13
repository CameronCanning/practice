import document from 'document';
import clock from 'clock';
import { vibration } from 'haptics';
import { centerPlayButton } from '../helper';
import { back, next } from 'fitbit-views';

//TODO-fix: don't track time if passed
export default (timerSettings) => {
    let timerLabel = document.getElementById('timer');
    let playButton = document.getElementById('play-button'); 
    let playImage = document.getElementById('play-image');
    let playSection = document.getElementById('play-button-section');
    let pauseSection = document.getElementById('pause-section');
    let discardButton = document.getElementById('discard-button');
    let finishButton = document.getElementById('finish-button');

    centerPlayButton(playSection, playImage);

    let duration = (timerSettings.duration == 0) ? 0 : timerSettings.duration * 60 * 1000;
    let intervals = timerSettings.intervals;
    let isCounting = false;
    let timerStart = 0;
    let previousElasped = 0;

    let play = () => {
        timerStart = Date.now();
        isCounting = true;
        playImage.image = 'icons\\btn_combo_pause_press_p.png';
        clock.granularity = 'seconds';
        pauseSection.style.display = 'none';
    }

    let pause = () => {
        previousElasped += currentElasped();
        isCounting = false;
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
    let currentElasped = () => {
        return Date.now() - timerStart;
    }
    let totalElasped = () => {
        return previousElasped + currentElasped();
    }
    let done = () => {
        if (duration){
            return (duration <= totalElasped()) ? true : false;
        }
        return false;
    }

    let updateTimer = () => {
        let timerValue = (duration) ? duration - totalElasped() : totalElasped();
        let [m, s] = msToMinSec(timerValue);
        timerLabel.text = toString([m, s]);
    } 
    playButton.onclick = () => {
        isCounting ? pause() : play();
    }

    discardButton.onclick = () => {
        back(timerSettings);
    }

    finishButton.onclick = () => {
        vibration.start('nudge-max');
        next('timer_finish', {timerSettings, totalElasped()});
    }

    clock.ontick = (evt) => {
        updateTimer();
        if (done()){
            vibration.start('nudge-max');
            clock.granularity = 'off';
            next('timer_finish', {timerSettings, totalElasped()});
        }
    }
    play();
    updateTimer();
    
}

