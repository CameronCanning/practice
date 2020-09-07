import { next } from 'fitbit-views';
import document from 'document';

export default () => {
    const duration = document.getElementById('duration');
    const interval = document.getElementById('interval');
    const activity = document.getElementById('activity');

    duration.onclick = () => {
        console.log('dur');
    }

    interval.onclick = () => {
        console.log('int');
    }

    activity.onclick = () => {
        console.log('act');
    }

}
