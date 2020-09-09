import { setup, next } from 'fitbit-views';
import log_view from './views/log';
import setup_view from './views/setup'
import setup_activity_view from './views/setup_activity';
import setup_duration_view from './views/setup_duration';
import timer_view from './views/timer';


import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';
import { Timer } from './Timer';

setup({
    'setup' : setup_view,
    'setup_activity' : setup_activity_view,
    'setup_duration' : setup_duration_view,
    'timer' : timer_view,
    'log'   : log_view,
});

//good place to grab defaults from settings and send as param to next
let timerSettings = {
    duration: 10,
    intervals: 0,
    activity: 'Meditation',
} 
next('setup', timerSettings);




