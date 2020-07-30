let timerObj = {  //a new object is created
    minutes : 0,
    seconds : 0,
    timerId : 0
}


function soundAlarm() {   
    
    let amount = 2; 
    let audio = new Audio("Timer_Sound_Effect.mp3"); //Audio() is an inbuild javascript object and takes the audio file as the input
    
    function playSound(){
        audio.pause;
        audio.currentTime = 0;
        audio.play();
    }
    for(let i=0; i < amount; i++){
        setTimeout(playSound,1200*i);
    }
    
    
}