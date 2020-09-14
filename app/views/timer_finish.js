import document from 'document';
import exercise from 'exercise';
import { next, buttons } from 'fitbit-views';

export default (param) => {
    let logButton = document.getElementById('log-button');

    console.log('timer_finish');
    console.log(param.timerSettings.duration);
    console.log(param.timerContext.completed);
    //x minutes
    //x day streak
    //avg heart rate?

    logButton.onclick = () => {
        exercise.start(param.timerSettings.activity);
        next('setup', param.timerSettings);
    }

    buttons.back = () => {
        next('setup', param.timerSettings);
    }
}