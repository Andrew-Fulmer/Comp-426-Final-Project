$(document).ready(function(){

    $("#selectEvent").on("click", function(id){   // Might need to make id name
        console.log("you clicked search button");
    });

    $("#signup").on("click", function(e){
        e.preventDefault();
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value/*,document.getElementById("s-email")*/));
    });

    $("#login").on("click", function(e){
        e.preventDefault();
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);       
        
    });



    $("#pathButton").on("click",function(){
        location="http://localhost:3001/userDashboard.html"
    
    })

});
