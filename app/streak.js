import { readFileSync, writeFileSync, existsSync } from "fs";

export let streak = () => {
    const fn = 'streak.cbor';
    let today = new Date();
    let yesterday = new Date();
    yesterday = new Date((yesterday.setDate(yesterday.getDate()-1)));

    today = today.toLocaleDateString();
    yesterday = yesterday.toLocaleDateString();

    if (!existsSync(fn)){
        let streakData = {
            'lastDate' : today,
            'length' : 1,
        }
        writeFileSync(fn, streakData, 'cbor');
        
        return 1;
    }
    
    let streakData = readFileSync(fn, 'cbor');
    if (streakData['lastDate'] === yesterday){
        streakData['length'] += 1;
        console.log('streak increase');
    }
    else if (streakData['lastDate'] !== today){
        streakData['length'] = 1;
        console.log('streak reset');   
    }
    streakData['lastDate'] = today;
    writeFileSync(fn, streakData, 'cbor');
    return streakData['length'];
}