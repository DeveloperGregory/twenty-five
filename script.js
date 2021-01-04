const BEGINBREAK = 5;
const BEGINSESSION = 25;
let breakInc = document.getElementById('break-increment');
let breakDisplay = document.getElementById('break-length');
let breakDec = document.getElementById('break-decrement');
let sessionInc = document.getElementById('session-increment');
let sessionDisplay = document.getElementById('session-length');
let sessionDec = document.getElementById('session-decrement');
let resetBtn = document.getElementById('reset');
let breakLength = BEGINBREAK;
let sessionLength = BEGINSESSION;

function updateDisplay(){
    breakDisplay.innerHTML = breakLength;
    sessionDisplay.innerHTML = sessionLength;
}

function changeSession(amount){
    sessionLength += amount; 
    if(sessionLength >= 60){
        sessionLength = 60;
    }
    if(sessionLength <= 0){
        sessionLength = 0
    }
    updateDisplay();
}

function changeBreak(amount){
    breakLength += amount; 
    if(breakLength >= 60){
        breakLength = 60;
    }
    if(breakLength <= 0){
        breakLength = 0
    }
    updateDisplay();
}

function resetApp(){
    breakLength = BEGINBREAK;
    sessionLength = BEGINSESSION;
    updateDisplay();
}


updateDisplay();
breakInc.addEventListener("click", () => changeBreak(1));
breakDec.addEventListener("click", () => changeBreak(-1));
sessionInc.addEventListener("click", () => changeSession(1));
sessionDec.addEventListener("click", () => changeSession(-1));
resetBtn.addEventListener('click', resetApp);