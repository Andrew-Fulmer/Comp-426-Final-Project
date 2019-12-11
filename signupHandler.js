


$(document).ready(function(){



    $("#signup").on("click", function(e){
        e.preventDefault();
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value);
    });

    $("#login").on("click", function(e){
        e.preventDefault();
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);       
        
    });



    $("#pathButton").on("click",function(){
        location="http://localhost:3001/userDashboard.html"
    
    })

});



async function handleSignup(user,pass){
    console.log("it is here");
    const makeUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/create',
        "data":{
            "name": user,
            "pass": pass,
        }
    });

}

/**
    possible event structure (so the events thing stored in account.json will be an array of event objects)
    {
        created By:
        isMine: 
        lengthOfMeeting:
        possibleDates:{
            {
                user:
                myPossibleDates:{
                    array of date objects, 
                }
            }, array of these ^^ things I don't think this syntax is right but the idea is there
        }
        currentIdealMeetingTime: {
            a JS date object 
        }
    }

    possible to have something where you can enter a timespan of dates that are free (would have to find a was to exclude the times when the user is busy)
 */

async function handleLogin(user,pass){
    const loginUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        "data":{
            "name": user,
            "pass": pass,
        }
    }).then(function(result){
        localStorage.setItem('jwt',result.jwt);
        console.log(localStorage.getItem('jwt'));
        location="http://localhost:3001/userDashboard.html"
    })


}
