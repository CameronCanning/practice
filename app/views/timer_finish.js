import { back, next, buttons } from 'fitbit-views';

export default ({timerSettings, duration}) => {
    console.log('timer_finish');
    console.log(duration);

    
    buttons.back = () => {
        next('setup', timerSettings);
    }
}