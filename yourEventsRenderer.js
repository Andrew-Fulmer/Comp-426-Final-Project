count = 0;
max = 100;

$(document).ready(function(){

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

    $("#editEvent-"+event.id+"").on("click",function(){
        //console.log("yes");
        $("#joinEvent-"+event.id+"").attr("disabled", true)
        $("#editEvent-"+event.id+"").attr("disabled",true);
        $("#edit-"+event.id+"").append(
            '<form>'+
            '<div class="field">'+
                '<label class="lable">Event Name</label>'+
                '<div class="control">'+
                    '<input type="text" id="editName-'+event.id+'">'+
                '</div>'+
            '</div>'+

            '<div class="field">'+
                    '<label class="lable">Event Description</label>'+
                    '<div class="control">'+
                        '<input type="text" id="editDes-'+event.id+'">'+
                    '</div>'+
            '</div>'+

            
            '<div class="field">'+
                    '<label class="lable">Time Span</label>'+
                    '<div class="control">'+
                        '<input type="text" id="editLen-'+event.id+'">'+
                    '</div>'+
            '</div>'+
        '</form>'+
        '<button id="submit-'+event.id+'">Submit Changes</button>'+
        '<button id="cancel-'+event.id+'"> Cancel Changes</button>'

        );
            // submit changes to edited object
        $("#submit-"+event.id+"").on("click",function(){
            submitChanges(event.id);
        });
    
        $("#cancel-"+event.id+"").on("click",function(){
            $("#joinEvent-"+event.id+"").attr("disabled", false)
            $("#editEvent-"+event.id+"").attr("disabled",false);
            $("#edit-"+event.id+"").empty();
        })
    })

}

async function checkIfEvents() {
    console.log("Checking if events exist");
}
/*async function memberString(event) {
    var string1 = "";
    for (var i=0; i<event.members.length(); i++) {
        string1 += event.members[i] + ', ';
    }
    return string1;
}*/

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
                '<h1 class="title" id="name-'+event.id+'">'+event.eventName+'</h1>'+
                '<p id="des-'+event.id+'">Event Description:'+event.eventDescription+'</p>'+
                '<p id="len-'+event.id+'">Length:'+event.length+'</p>'+

                //'<p id="members-'+event.id+'">Members: '+memberString(event) +'</p>'+             <- returns an object promise, not an object
                '<p id="members-'+event.id+'">Members: '+event.members.toString() +'</p>'+
                '<br>'+
                '<button class="button is-rounded is-warning" id="editEvent-'+event.id+'">Edit Event</button>'+
                '<button class="button is-rounded is-danger" id="deleteEvent-'+event.id+'">Delete Event</button> '+
                '<button class="button is-rounded is-success" id="bestTimes-'+event.id+'">Best Time</button> '+
                
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

