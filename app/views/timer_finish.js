import document from 'document';
import exercise from 'exercise';
import { next, buttons } from 'fitbit-views';
import { me } from 'appbit';
import { toString, msToMinSec } from '../helper';
import { streak } from '../streak';

export default (timerSettings) => {
    let durationText = document.getElementById('duration'); 
    let streakText = document.getElementById('streak');
    let hrText = document.getElementById('hr');
    let closeButton = document.getElementById('close-button');

    let [m, s] = msToMinSec(exercise.stats.activeTime);
    let duration = toString([m,s]);
    let avgHeartRate = exercise.stats.heartRate.average;
    let streakLength = streak();
    exercise.stop();
    
    durationText.text = duration;
    streakText.text = `${streakLength} day streak`;
    hrText.text = `${avgHeartRate} avg`;

    closeButton.onclick = () => {
        me.exit();
    }
    
    buttons.back = () => {
        next('setup', timerSettings);
    }
}