import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';
import { Timer } from '../Timer';
import { centerPlayButton } from '../helper';
import {me} from "appbit";
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

    let duration = timerSettings.duration * 60 * 1000;
    let intervals = timerSettings.intervals;
    let isCounting = false;
    let timerStart = 0;
        
    let play = () => {
        timerStart = Date.now();
        isCounting = true;
        playImage.image = 'icons\\btn_combo_pause_press_p.png';
        clock.granularity = 'seconds';
        pauseSection.style.display = 'none';
    }

    let pause = () => {
        duration = duration - (Date.now() - timerStart);
        isCounting = false;
        playImage.image = 'icons\\btn_combo_play_press_p.png';
        pauseSection.style.display = 'inline';
        clock.granularity = 'off';
    }

    let elaspedTime = () => {
        return timerStart ? Date.now() - timerStart : 0;
    }
    let done = () => {
        if (duration <= elaspedTime()){
            isCounting = false;
            return true;
        }
        return false;
    }

    let msToMinSec = (ms) => {
        let s = Math.floor(ms/1000);
        let m = Math.floor(s/60);
        s = s - (m*60);
        return [m, s];
    }

    let toString = () => {
        let [m, s] = msToMinSec(duration - elaspedTime());
        if (s < 10) s = `0${s}`;
        console.log(`${m}:${s}`);
        return `${m}:${s}`;
    }
    let start = () => {
        timerLabel.text = toString();
        play();
    }
    playButton.onclick = () => {
        isCounting ? pause() : play();
    }

    discardButton.onclick = () => {
        back(timerSettings);
    }

    finishButton.onclick = () => {
        next('timer_finish');
    }

    clock.ontick = () => {
        if (isCounting){
            if (done()){
                next('timer_finish');
            }
            else{
                timerLabel.text = toString();
            }
        }
    }
    start()
}