import { next } from 'fitbit-views';
import document from 'document';
import { me as device } from 'device';

export default (timerSettings) => {
    let setupView = document.getElementById('setup-view-default');
    let durationButton = document.getElementById('duration-button');
    let durationValue = document.getElementById('duration-value');
    let intervalButton = document.getElementById('interval-button');
    let intervalValue = document.getElementById('interval-value');
    let activityButton = document.getElementById('activity-button');
    let activityValue = document.getElementById('activity-value');
    let activityPopup = document.getElementById('activity-popup');
    let playButton = document.getElementById('play-button');   

    playButton.onclick = () => {
        next('timer_view', { timerSettings });
    }
    durationButton.onclick = () => {
        console.log('Duration popup');
        
    }
    intervalButton.onclick = () => {
        console.log('int');
    }
    activityButton.onclick = () => {
        next('setup_activity_view', timerSettings);
        console.log('Activity popup');
    }
    document.onkeypress = (evt) => {
        if (evt.key === 'back' && setupView.style.display === 'none'){
            showDefault();
            evt.preventDefault();
        }
    }

    let setSetupValues = ({ duration, intervals, activity }) => {
        durationValue.text = duration;
        intervalValue.text = intervals;
        activityValue.text = activity;
    }
    centerPlayButton();
    setSetupValues(timerSettings);

}

let centerPlayButton = () => {
    let playButtonSection = document.getElementById('play-button-section');
    let playButtonImage = document.getElementById('play-image');
    if (!device.screen) device.screen = { width: 348, height: 250 };

    let sectionWidth = 0.25 * device.screen.height;
    playButtonSection.width = sectionWidth;
    playButtonSection.x = (device.screen.width/2) - (sectionWidth/2);

    playButtonImage.width = sectionWidth/2;
    playButtonImage.height = sectionWidth/2;

    playButtonImage.y = sectionWidth/2 - playButtonImage.width/2;
    playButtonImage.x = device.screen.width/2 - playButtonImage.width/2;    
}
    
