

$(document).ready(function(){
    $("#eventButton").on("click",function(){
        generateNewEvent(document.getElementById("eventName").value,document.getElementById("eventDes").value,document.getElementById("timeSpan").value);
    });

    $("#getEvents").on("click",function(){
        getEvents();
    });
});

async function generateNewEvent(name,des,length){
    console.table(event);
    const makeEvent = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/private/Events',
        "data":{
            "eventName": name,
            "eventDescription":des,
            "creator":"test",
            "isMine": false,
            "length":length,


        }
    });
}

async function getEvents(){
    const getEvents = await $.ajax({
        method:'get',
        url: 'http://localhost:3000/private/getEvents',
    })
}


