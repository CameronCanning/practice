import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';
import { Timer } from './Timer';

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


const timerLabel = document.getElementById('timer');
const playBtn = document.getElementById('play-btn'); 
let playIcon = document.getElementById('combo-button-icon');
let playIconPress = document.getElementById('combo-button-icon-press');
const restartBtn = document.getElementById('restart-btn');
restartBtn.style.display = 'none';

// TODO get setting defaults
let [m, s] = [2, 0];
let intervals = [[0,55], [0, 50]];
const timer = new Timer(m, s, intervals);
timerLabel.text = timer.toString();


timerLabel.onclick = () => {
    console.log('change time');
}

playBtn.onclick = () => {
    if (timer.isCounting){ 
        console.log('pause');
        playIcon.image = 'icons\\btn_combo_play_p.png';
        playIconPress.image = 'icons\\btn_combo_play_press_p.png';
        timer.pause();
        toggle(restartBtn);
    }
    else{
        if (timer.timerStart) toggle(restartBtn);
        console.log('play');
        playIcon.image = 'icons\\btn_combo_pause_p.png';
        playIconPress.image = 'icons\\btn_combo_pause_press_p.png';
        timer.play();
    }
}

restartBtn.onclick = () => {
    toggle(restartBtn);
    timer = new Timer(m, s, intervals);
    timerLabel.text = timer.toString();
}

clock.granularity = 'seconds';
clock.ontick = () => {
    if (timer.isCounting){
        timerLabel.text = timer.toString();
    }
}

function toggle(element) {
    element.style.display = (element.style.display === "inline") ? "none" : "inline";
}
