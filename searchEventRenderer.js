$(document).ready(function(){
    getEvents();
});

async function getEvents(){
    const getEvents = await $.ajax({
        method:'get',
        url: 'http://localhost:3000/private/getEvents',
    });

    console.table(getEvents.result);
    renderEvents(getEvents.result);
}

async function renderEvents(events){
    events.forEach(function(event){
        renderEventCard(event);

    });

}

async function addToGroup(id){
    const addToEvent = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/private/addToEvent',
        data:{
            "eventId":id
        }
    })
}

async function renderEventCard(event){
    let card =$(
        '<article class="media box" id="event-'+event.id+'">'+
        '<div class="media-left">'+
        '</div>'+
        '<div class="media-content">'+
            '<p id="name-'+event.id+'">Event Name:'+event.eventName+'</p>'+
            '<p id="des-'+event.id+'">Event Description:'+event.eventDescription+'</p>'+
            '<p id="len-'+event.id+'">Length:'+event.length+'</p>'+
            '<p id="members-'+event.id+'">Members:'+event.members.toString()+'</p>'+
            '<br>'+
            '<button class="button is-rounded" id="joinEvent-'+event.id+'">Join Event</button>'+
        '</div>'+
    '</article>'
    );
    $("#eventShow").append(card);
    $("#joinEvent-"+event.id+"").on("click",function(){
        console.log("hey");
        addToGroup(event.id);
    })
}