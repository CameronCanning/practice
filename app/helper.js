import { me as device } from 'device';
import { toString, msToMinSec } from '../helper';

export let centerPlayButton = (playButtonSection, playButtonImage) => {

    if (!device.screen) device.screen = { width: 348, height: 250 };

    let sectionWidth = 0.25 * device.screen.height;
    playButtonSection.width = sectionWidth;
    playButtonSection.x = (device.screen.width/2) - (sectionWidth/2);

    playButtonImage.width = sectionWidth/2;
    playButtonImage.height = sectionWidth/2;

    playButtonImage.y = sectionWidth/2 - playButtonImage.width/2;
    playButtonImage.x = device.screen.width/2 - playButtonImage.width/2;    
}

export let msToMinSec = (ms) => {
    let s = Math.floor(ms/1000);
    let m = Math.floor(s/60);
    s = s - (m*60);
    return [m, s];
}

export let toString = ([m, s]) => {
    if (s < 10) s = `0${s}`;
    console.log(`${m}:${s}`);
    return `${m}:${s}`;
}