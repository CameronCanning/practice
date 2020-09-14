import { buttons, back } from 'fitbit-views';
import document from 'document';

export default (timerSettings) => {
    let list = document.getElementById("my-list");
    let items = list.getElementsByClassName("tile-list-item");
    items.forEach((element, index) => {
        let touch = element.getElementById("tile-item-button");
        touch.onclick = () => {
            let activity = element.text;
            activity = activity.charAt(0).toUpperCase() + activity.slice(1);
            console.log(`activity selected: ${activity}`);      
            timerSettings.activity = activity;
            back(timerSettings);
        }
    });
    
    buttons.back = () => {
        back(timerSettings);
    }
}    
    
    