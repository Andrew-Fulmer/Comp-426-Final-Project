count = 0;
max = 100;

$(document).ready(function(){
    //const events[];
    //var count =0;
    //var max;
    getEvents();
    
});


async function getEvents(){
    const getEvents = await $.ajax({
        method:'get',
        url: 'http://localhost:3000/private/getEvents',
    });

    const events = [];
    /*for (let i=0; i<getEvents.result.length(); i++) {
        events[i] = getEvents.result[i];
    }*/
    console.table(getEvents.result);
    
    renderEvents(getEvents.result);
    
    console.log("1:   " + getEvents.result[0].isMine);
}

async function renderEvents(events){
    events.forEach(function(event){
        renderEventCard(event);

    });

}

async function checkIfEvents() {
    console.log("Checking if events exist");
}

// TODO  Maybe add something for it to say if you don't have any of your own events
async function renderEventCard(event){
    console.log(event.isMine);
    //var count = 0;
    count ++;
    if (event.isMine == "true") {

        //count++;
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
                '<button class="button is-rounded is-danger" id="deleteEvent-'+event.id+'">Delete Event</button> '+
                
            '</div>'+
        '</article>'
        );
        
        //console.log(count);
        $("#eventShow").append(card);
        count++;
        console.log(count);

    }
    
    else {
        console.log("nothing here");
        if (count != max) {
            console.log("count = "+ count + "  max = " + max);
        }
    }


    //$("#eventShow").append(card);
}

