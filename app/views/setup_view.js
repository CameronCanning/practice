import { next } from 'fitbit-views';
import document from 'document';
import { me as device } from 'device';

export default (timerSettings) => {
    let durationButton = document.getElementById('duration-button');
    let durationValue = document.getElementById('duration-value');
    let intervalButton = document.getElementById('interval-button');
    let intervalValue = document.getElementById('interval-value');
    let activityButton = document.getElementById('activity-button');
    let activityValue = document.getElementById('activity-value');
    let playButton = document.getElementById('play-button');   

    playButton.onclick = () => {
        next('timer_view', timerSettings);
    }
    durationButton.onclick = () => {
        next('setup_duration_view', timerSettings);
        
    }
    intervalButton.onclick = () => {
        console.log('int');
    }
    activityButton.onclick = () => {
        next('setup_activity_view', timerSettings);
    }

    let setSetupValues = ({ duration, intervals, activity }) => {
        (duration > 0) ? durationValue.text = `${duration} m` : durationValue.text = 'infinity';
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
    
