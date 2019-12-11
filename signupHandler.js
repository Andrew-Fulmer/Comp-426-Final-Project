


$(document).ready(function(){


    // I attempted to add email to this
    $("#signup").on("click", function(){
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value/*,document.getElementById("s-email")*/);
    })


    $("#login").on("click", function(){
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);       
    })

});


// added email stuff in here
async function handleSignup(user,pass/*,email*/){
    console.log("it is here");
    const makeUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/create',
        "data":{
            "name": user,
            "pass": pass,
            //"email": email,
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
    });
    
    

}
