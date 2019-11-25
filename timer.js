class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;

        }


        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeReamining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);

    };

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.timeReamining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeReamining = this.timeReamining - .05;
            if (this.onTick) {
                this.onTick(this.timeReamining);
            }
        }
    };
    get timeReamining() {
        return parseFloat(this.durationInput.value);
    }
    set timeReamining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}