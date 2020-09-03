import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';

/**
 * PRACTICE:
 *  need to haves:
 *      timer from x to 0:
 *          play/pause button,
 *          reset button,
 *      vibration:
 *          end,
 *          intervals
 *      log:
 *          view of all days with a meditation session (cirlce outlined or filled)
 * 
 *      defaults:
 *          timer, intervals 
 *      monospacing numbers:
 *  nice to haves:  
 *      cleaner ui:
 *          dial timer setter,
 *          always on mode with just minutes remaining
 */


const timer = document.getElementById('timer');
const playBtn = document.getElementById('play-btn'); 
let playIcon = document.getElementById('combo-button-icon');
let playIconPress = document.getElementById('combo-button-icon-press');
const restartBtn = document.getElementById('restart-btn');
restartBtn.style.display = 'none';

// TODO get setting defaults
let [m, s] = [10, 0];
let timerLength = (m*60 + s) * 1000;
let timerStart = 0
timer.text = msToString(timerLength);

timer.onclick = () => {
    console.log('change time');
}

let isCounting = false;
playBtn.onclick = () => {
    if (isCounting){
        console.log('pause');
        timerLength = timerLength - (Date.now() - timerStart)
        playIcon.image = 'icons\\btn_combo_play_p.png';
        playIconPress.image = 'icons\\btn_combo_play_press_p.png';
        isCounting = false;
        toggle(restartBtn);
    }
    else{
        if (timerStart) toggle(restartBtn);
        console.log('play');
        timerStart = Date.now();
        playIcon.image = 'icons\\btn_combo_pause_p.png';
        playIconPress.image = 'icons\\btn_combo_pause_press_p.png';
        isCounting = true;

    }
}

restartBtn.onclick = () => {
    toggle(restartBtn);
    timerStart = 0
    timerLength = (m*60 + s) * 1000;
    timer.text = msToString((m*60 + s) * 1000);
}

clock.granularity = 'seconds';
clock.ontick = (e) => {
    if (isCounting){
        let elaspedTime = timerLength - (Date.now() - timerStart);
        timer.text = msToString(timerLength - (Date.now() - timerStart));
    }
    
}

//TODO: move helper functions
function msToMinSec(ms){
    let s = Math.floor(ms/1000);
    let m = Math.floor(s/60);
    s = s - (m*60);
    return [m, s];
}

function msToString(ms){
    let [m, s] = msToMinSec(ms);
    if (s < 10) s = '0'+s;
    return m + ':' + s;
}

function toggle(element) {
    element.style.display = (element.style.display === "inline") ? "none" : "inline";
}
