import { next, buttons } from 'fitbit-views';
import document from 'document';
import { centerPlayButton } from '../helper';
import { me } from 'appbit';

export default (timerSettings) => {
    let durationButton = document.getElementById('duration-button');
    let durationValue = document.getElementById('duration-value');
    let intervalButton = document.getElementById('interval-button');
    let intervalValue = document.getElementById('interval-value');
    let activityButton = document.getElementById('activity-button');
    let activityValue = document.getElementById('activity-value');
    let playButton = document.getElementById('play-button');   

    playButton.onclick = () => {
        next('timer', timerSettings);
    }
    durationButton.onclick = () => {
        next('setup_duration', timerSettings);
        
    }
    intervalButton.onclick = () => {
        console.log('int');
    }
    activityButton.onclick = () => {
        next('setup_activity', timerSettings);
    }

    buttons.back = () => {
        me.exit();
    }
    
    let setSetupValues = ({ duration, intervals, activity }) => {
        (duration > 0) ? durationValue.text = `${duration} m` : durationValue.text = 'Infinity';
        intervalValue.text = intervals.length;
        activityValue.text = activity;
    }

    centerPlayButton(document.getElementById('play-button-section'), document.getElementById('play-image'));
    setSetupValues(timerSettings);

}
