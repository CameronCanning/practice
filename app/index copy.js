import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';
import { Timer } from './Timer';

const timerView = document.getElementById('timer-view');
const finishedView = document.getElementById('finished-view');

const timerLabel = document.getElementById('timer');
const playBtn = document.getElementById('play-btn'); 
let playIcon = document.getElementById('combo-button-icon');
let playIconPress = document.getElementById('combo-button-icon-press');
const restartBtn = document.getElementById('restart-btn');
restartBtn.style.display = 'none';

let [m, s] = [0, 3];
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
        toggle(restartBtn);
        timer.pause();
        
    }
    else{
        if (timer.timerStart) toggle(restartBtn);
        console.log('play');
        clock.granularity = 'seconds';
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


clock.ontick = () => {
    if (timer.done()){
        vibration.start('ring');
        console.log('vibe');
        clock.granularity = 'off';
        showFinishedView();
        //do finish/log meme
    }
    else if (timer.isCounting){
        timerLabel.text = timer.toString();
    }
}

function toggle(element) {
    element.style.display = (element.style.display === "inline") ? "none" : "inline";
}

function showTimerView(){
    console.log('show timer view');
    timerView.style.display = 'inline';
    finishedView.style.display = 'none';
}

function showFinishedView(){
    console.log('show finished view');
    timerView.style.display = 'none';
    finishedView.style.display = 'inline';
}