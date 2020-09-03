export class Timer {
    constructor(m=0, s=0, i = []) {
        this.timeLeft = (m*60 + s) * 1000;
        this.timeStart = 0;
        this.intervals = i;
        this.isCounting = false;
    }

    play(){
        this.timeStart = Date.now();
        this.isCounting = true;
    }

    pause(){
        this.timeLeft = this.timeLeft - (Date.now() - this.timerStart);
        this.timeStart = 0;
        this.isCounting = false;
    }
    toString(){
        let [m, s] = (this.timeStart) ? 
            msToMinSec(this.timeLeft - (Date.now() - this.timeStart)) :
            msToMinSec(this.timeLeft);
        if (s < 10) s = '0' + s;
        console.log(m + ':' + s);
        return m + ':' + s;
    }
}

function msToMinSec(ms){
    let s = Math.floor(ms/1000);
    console.log(s);
    let m = Math.floor(s/60);
    console.log(m);
    s = s - (m*60);
    console.log(s);
    return [m, s];
}