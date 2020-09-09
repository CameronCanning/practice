import { buttons, back } from 'fitbit-views';
import document from 'document';

export default (timerSettings) => {
    
    let tumbler100 = document.getElementById('tumbler-100');
    let tumbler10 = document.getElementById('tumbler-10');
    let tumbler1 = document.getElementById('tumbler-1');
    let submitButton = document.getElementById('submit-button');
    let infinityButton = document.getElementById('infinity-button');

    //TODO: set 0 to grey when insig digit
    
    if (timerSettings.duration > 0){
        tumbler100.value = Math.floor(timerSettings.duration/100);
        tumbler10.value = Math.floor(((timerSettings.duration - (tumbler100.value * 100))/10));
        tumbler1.value = timerSettings.duration - (tumbler10.value*10);
    } 

    let submitTumblerValues = () =>{
        let selectedItem100 = tumbler100.getElementById('item' + tumbler100.value);
        let selectedValue100 = selectedItem100.getElementById('content').text;
        let selectedItem10 = tumbler10.getElementById('item' + tumbler10.value);
        let selectedValue10 = selectedItem10.getElementById('content').text;
        let selectedItem1 = tumbler1.getElementById('item' + tumbler1.value);
        let selectedValue1 = selectedItem1.getElementById('content').text;

        let duration = selectedValue100*100 + selectedValue10*10 + selectedValue1*1;
        (duration > 0) ? timerSettings.duration = duration : timerSettings.duration = 1;

        console.log(`duration set to: ${timerSettings.duration}`);
        back(timerSettings);
    }

    buttons.back = submitTumblerValues;

    submitButton.onclick = submitTumblerValues;

    infinityButton.onclick = () => {
        timerSettings.duration = -1;
        back(timerSettings);
    }
}