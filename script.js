let timerObj = {  //a new object is created
    minutes : 0,
    seconds : 0,
    timerId : 0
}


function soundAlarm() 
{   
    
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

function updateValue(key,value){
    if(value < 0){
        value = 0;
        console.log("Positive numbers only");
    }
    if (key == "seconds"){
        if (value < 10){
            value = "0" + value;
        }

        if(value > 59){
            value = 59;
        }
        
    }
    $("#"+ key).html(value || 0);
    timerObj[key] = value;


}

(function detectChanges(key)       //self calling function here function is called immediately after the script is executed 
{
    let input = "#"+key+"-input";

    $(input).change(function(){
        updateValue(key, $(input).val());
    });

    $(input).keyup(function(){
        updateValue(key, $(input).val());
    });

    return arguments.callee;

})("minutes")("seconds");

function startTimer()
{
    buttonManager(["start",false],["stop",true],["pause",true]);
    freezeInputs();


    // here interval is set to a function so that it repeats itself in that interval ie. 1000ms
    timerObj.timerId = setInterval(function() {
        timerObj.seconds--;         
        if(timerObj.seconds < 0)
        {
            if(timerObj.minutes == 0)
            {
                soundAlarm();
                return stopTimer();
            }
            timerObj.seconds = 59;
            timerObj.minutes--;
        }
        
        updateValue("minutes",timerObj.minutes);
        updateValue("seconds",timerObj.seconds);

    },1000)

}

function stopTimer()
{
    clearInterval(timerObj.timerId);    //stop storing in timerId 
    buttonManager(["start",true],["stop",false],["pause",false]);
    unfreezeInputs();
    updateValue("minutes",$("#minutes-input").val());
    updateValue("seconds",$("#seconds-input").val());

    /*if the seconds is falsy or undefined set seconds to "0"
    just 1 zero because earlier we checked if the value is less than 10, and if it is it will add an extra zero for you.
    the seconds will be by default be undefined . Explicitily setting the seconds to 0 will prevent formats such as 1:0 when te timer expires*/
    let seconds = $("#seconds-input").val() || "0";
    updateValue("seconds",seconds);
}

function pauseTimer()
{
    buttonManager(["start",true],["stop",true],["pause",false]);
    clearInterval(timerObj.timerId);
}
// rest operator is being used
// rest operator allows to pass as many arguments as we wish
// here buttonsArray will be an array of array, where inside array contain two elements eg["start",true]
function buttonManager(...buttonsArray)
{
    for(let i=0; i < buttonsArray.length ; i++)
    {
        let button = "#" + buttonsArray[i][0] + "-button"; //this will give us id of each button
        if(buttonsArray[i][1])
        {
            $(button).removeAttr("disabled");
        }
        else
        {
            $(button).attr("disabled","disabled");
        }
    }

}

// this function user from inputing while time is running
function freezeInputs()
{
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}
function unfreezeInputs()
{
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}



//can also be called as below
/*function example(){

}
example();*/
