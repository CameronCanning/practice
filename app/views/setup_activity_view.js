import { buttons, back } from 'fitbit-views';
import document from 'document';

export default (timerSettings) => {
    let list = document.getElementById("my-list");
    let items = list.getElementsByClassName("tile-list-item");
    console.log({timerSettings});
    console.log(timerSettings);
    console.log(timerSettings.activity);
    items.forEach((element, index) => {
        let touch = element.getElementById("tile-item-button");
        touch.onclick = (evt) => {
            let activity = element.text.slice(1);
            console.log(`activity selected: ${activity}`);      
            timerSettings.activity = activity;
            back(timerSettings);
        }
    });
    
    buttons.back = () => {
        back(timerSettings);
    }
}    
    
    