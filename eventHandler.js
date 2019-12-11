
export class Event{
    constructor(eventName_, eventDescription_,creator_,isMine_,length_, creatorDate){
        this.eventInfo = {
            eventName: eventName_,
            eventDescription: eventDescription_,
            creator: creator_,
            isMine: isMine_,
            length: length_,
            possibleDates: [creatorDate],
            currentMeetingTime: 0,
            members: [creator_],
            
        }

    }

    addNewPossibleDates(eventDate,member){
        this.eventInfo.possibleDates.push(eventDate);
        this.eventInfo.members.push(member);
    }

    findOptimalDate(){

    }
}

export class eventDates{
    constructor(username,dates){
        this.eventDateInfo = {
            user: username,
            avail: [48]
        }
    }
}

$(document).ready(function(){
    $("#eventButton").on("click",function(){
        console.log("fuck");
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
            "isMine": true,
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
