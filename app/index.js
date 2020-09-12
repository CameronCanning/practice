import { setup, next } from 'fitbit-views';
import log from './views/log';
import setup_view from './views/setup'
import setup_activity from './views/setup_activity';
import setup_duration from './views/setup_duration';
import timer from './views/timer';
import timer_finish from './views/timer_finish';


setup({
    'setup' : setup_view,
    'setup_activity' : setup_activity,
    'setup_duration' : setup_duration,
    'timer' : timer,
    'log'   : log,
    'timer_finish' : timer_finish,
});

//good place to grab defaults from settings and send as param to next
let timerSettings = {
    duration: 1,
    intervals: 0,
    activity: 'Meditation',
} 
next('setup', timerSettings);




