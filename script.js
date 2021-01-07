const BEGINBREAK = 5;
const BEGINSESSION = 25;
let breakInc = document.getElementById('break-increment');
let breakDisplay = document.getElementById('break-length');
let breakDec = document.getElementById('break-decrement');
let sessionInc = document.getElementById('session-increment');
let sessionDisplay = document.getElementById('session-length');
let sessionDec = document.getElementById('session-decrement');
let timerDisplay = document.getElementById('time-left');
let resetBtn = document.getElementById('reset');
let startStop = document.getElementById('start_stop');
let timerLabel = document.getElementById('timer-label');


class TimerVar{
    constructor(timeLeft, breakLength, sessionLength, isTimerRunning, currTimer){
        this.timeLeft = timeLeft;
        this.breakLength = breakLength;
        this.sessionLength = sessionLength;
        this.isTimerRunning = isTimerRunning;
        this.currTimer = currTimer;
    };
    
    setBreak = function(amount){
        this.breakLength = amount;
    };
    getBreak = function(){
        return this.breakLength;
    };

    setSession = function(amount){
        this.sessionLength = amount;
    };
    getSession = function(){
        return this.sessionLength;
    };

    setIsRunning = function(value){
        this.isTimerRunning = value
    };
    getIsRunning = function(){
        return this.isTimerRunning;
    };

    setTimeLeft = function(min,sec){
        this.timeLeft = [min,sec];
    };

    setTimerType = function(tType){
        this.currTimer = tType;
    };
}

let freshTimer = new TimerVar([BEGINSESSION,00],BEGINBREAK,BEGINSESSION, false, 'session');

function updateDisplay(){
    let seconds = (freshTimer.timeLeft[1] > 9) ? freshTimer.timeLeft[1] : "0" + freshTimer.timeLeft[1];
    breakDisplay.innerHTML = freshTimer.getBreak();
    sessionDisplay.innerHTML = freshTimer.getSession();
    timerDisplay.innerHTML = freshTimer.timeLeft[0] + ":" + seconds;
    timerLabel.innerHTML = freshTimer.currTimer;
    
}

function changeTimes(timerType, amount){
    let newTime = (timerType === 'session') ? freshTimer.getSession() : freshTimer.getBreak();
    if(newTime + amount >= 60){
        newTime = 60;
    }else if(newTime + amount <= 1){
        newTime = 1;
    }else{
        newTime += amount;
    }

    if(timerType === 'session'){
        freshTimer.setSession(newTime);
        freshTimer.setTimeLeft(newTime,00);
    }else if(timerType === 'break'){
        freshTimer.setBreak(newTime);
    }
    
    updateDisplay();
}

function resetApp(){
    toggleTimer();
    freshTimer.setBreak(BEGINBREAK);
    freshTimer.setSession(BEGINSESSION);
    freshTimer.timeLeft = [BEGINSESSION, 00];
    updateDisplay();
}

function countDown(){
    if(freshTimer.isTimerRunning){
        let minutes = freshTimer.timeLeft[0];
        let seconds = freshTimer.timeLeft[1];
        if(minutes > 0){
            if(seconds > 0){
                seconds -= 1;
            }else{
                seconds = 59;
                minutes -= 1;
            }
        }else{
            if(seconds == 0){
                if(freshTimer.currTimer === "session"){
                    freshTimer.setTimerType("break");
                    freshTimer.setTimeLeft(freshTimer.getBreak,00);
                    minutes = freshTimer.getBreak();
                }else{
                    freshTimer.setTimerType('session');
                    freshTimer.setTimeLeft(freshTimer.getSession,00);
                    minutes = freshTimer.getSession();
                }
                
                
            }else{
                seconds = ((seconds == 0) ? 59 : seconds -= 1);  
            }
        }

        
        freshTimer.setTimeLeft(minutes,seconds);
        updateDisplay();
    }
        
}

function toggleTimer(){
    freshTimer.setIsRunning((freshTimer.isTimerRunning) ? false : true);
}

updateDisplay();
breakInc.addEventListener("click", () => changeTimes("break", 1));
breakDec.addEventListener("click", () => changeTimes("break", -1));
sessionInc.addEventListener("click", () => changeTimes("session", 1));
sessionDec.addEventListener("click", () => changeTimes("session", -1));
resetBtn.addEventListener('click', resetApp);
startStop.addEventListener('click', toggleTimer);

setInterval(countDown,1000);