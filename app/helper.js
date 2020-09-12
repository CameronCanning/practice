import { me as device } from 'device';

export function centerPlayButton(playButtonSection, playButtonImage) {

    if (!device.screen) device.screen = { width: 348, height: 250 };

    let sectionWidth = 0.25 * device.screen.height;
    playButtonSection.width = sectionWidth;
    playButtonSection.x = (device.screen.width/2) - (sectionWidth/2);

    playButtonImage.width = sectionWidth/2;
    playButtonImage.height = sectionWidth/2;

    playButtonImage.y = sectionWidth/2 - playButtonImage.width/2;
    playButtonImage.x = device.screen.width/2 - playButtonImage.width/2;    
}
    