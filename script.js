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

    console.log("Min",timerObj.minutes);
    console.log("Sec",timerObj.seconds);

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
}

function stopTimer()
{
    buttonManager(["start",true],["stop",false],["pause",false]);
}

function pauseTimer()
{
    buttonManager(["start",true],["stop",true],["pause",false]);
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
buttonManager(43, 443,677,78,2,3)

//can also be called as below
/*function example(){

}
example();*/
