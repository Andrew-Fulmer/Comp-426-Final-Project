


$(document).ready(function(){



    $("#signup").on("click", function(){
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value);
    })

    $("#login").on("click", function(){
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);
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

    console.log(makeUser.status);

}


async function handleLogin(user,pass){
    const loginUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        "data":{
            "name": user,
            "pass": pass,
        }
    });
    console.log(loginUser.jwt);

}