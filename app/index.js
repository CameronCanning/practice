import { setup, next } from 'fitbit-views';
import log_view from './views/log_view';
import setup_view from './views/setup_view'
import timer_view from './views/timer_view'

import document from 'document';
import clock from 'clock';
import {vibration} from 'haptics';
import { Timer } from './Timer';

setup({
    'setup_view' : setup_view,
    'timer_view' : timer_view,
    'log_view'   : log_view,
});

//good place to grab defaults from settings and send as param to next
next('setup_view');




