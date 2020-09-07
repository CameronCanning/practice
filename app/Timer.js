export class Timer {
    constructor(m=0, s=0, i = []) {
        this.timerDuration = (m*60 + s) * 1000;
        this.timerStart = 0;
        this.intervals = i;
        this.isCounting = false;
    }

    play(){
        this.timerStart = Date.now();
        this.isCounting = true;
    }

    pause(){
        this.timerDuration = this.timerDuration - (Date.now() - this.timerStart);
        this.isCounting = false;
    }

    done(){
        if (this.timerDuration <= this._elaspedTime()){
            this.isCounting = false;
            return true;
        }
        return false;
    }

    toString(){
        let [m, s] = this._msToMinSec(this.timerDuration - this._elaspedTime());
        if (s < 10) s = '0' + s;
        console.log(m + ':' + s);
        return m + ':' + s;
    }

    _msToMinSec(ms){
        let s = Math.floor(ms/1000);
        let m = Math.floor(s/60);
        s = s - (m*60);
        return [m, s];
    }

    _elaspedTime(){
        return (this.timerStart) ? (Date.now() - this.timerStart) : 0;
    }
}
