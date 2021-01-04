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
let isTimerRunning = false;
let timeLeft = [BEGINSESSION,"00"];
let breakLength = BEGINBREAK;
let sessionLength = BEGINSESSION;

function updateDisplay(){
    breakDisplay.innerHTML = breakLength;
    sessionDisplay.innerHTML = sessionLength;
    timerDisplay.innerHTML = timeLeft[0] + ":" + timeLeft[1];
    
}

function changeSession(amount){
    sessionLength += amount; 
    if(sessionLength >= 60){
        sessionLength = 60;
    }
    if(sessionLength <= 0){
        sessionLength = 0;
    }

    timeLeft[0] = sessionLength;
    updateDisplay();
}

function changeBreak(amount){
    breakLength += amount; 
    if(breakLength >= 60){
        breakLength = 60;
    }
    if(breakLength <= 0){
        breakLength = 0;
    }
    updateDisplay();
}

function resetApp(){
    breakLength = BEGINBREAK;
    sessionLength = BEGINSESSION;
    updateDisplay();
}

function countDown(){
    let minutes = timeLeft[0];
    let seconds = timeLeft[1];
    if(isTimerRunning){
        seconds -= 1;
        if(seconds <= "00"){
            seconds = 59;
            if(minutes > 0){
                minutes -= 1;
            }
        }
        timeLeft[0] = minutes;
        timeLeft[1] = (seconds > 9) ? seconds : "0" + seconds;
        updateDisplay();
    }
    
}

function toggleTimer(){
    if(isTimerRunning){
        isTimerRunning = false;
    }else{
        isTimerRunning = true;
    }
}

updateDisplay();
breakInc.addEventListener("click", () => changeBreak(1));
breakDec.addEventListener("click", () => changeBreak(-1));
sessionInc.addEventListener("click", () => changeSession(1));
sessionDec.addEventListener("click", () => changeSession(-1));
resetBtn.addEventListener('click', resetApp);
startStop.addEventListener('click', toggleTimer);

setInterval(countDown,1000);