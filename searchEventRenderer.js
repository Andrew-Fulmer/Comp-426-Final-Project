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
        console.log('it should have rendered the event')
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
async function removeFromGroup(id) {
    const removeFromEvent = await $.ajax({
        method: 'delete',
        url: 'http://localhost:3000/private/addToEvent',
        data:{
            "eventId":id
        }
    })
}





async function renderEventCard(event){
    console.log('about to render');
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
            '<button class="button is-rounded" id="editEvent-'+event.id+'">Edit Event</button>'+
            '<div id="edit-'+event.id+'"></div>'+
        '</div>'+
    '</article>'
    );
    $("#eventShow").append(card);
    $("#joinEvent-"+event.id+"").on("click",function(){
        addToGroup(event.id);
    })
    $("#editEvent-"+event.id+"").on("click",function(){
        console.log("yes");
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

async function submitChanges(id){
    const submitEventChanges = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/private/editEvent',
        data:{
            "eventId":id,
            "editedEventName": document.getElementById(`editName-${id}`).value,
            "editedEventDescription":  document.getElementById(`editDes-${id}`).value,
            "editedLength":  document.getElementById(`editLen-${id}`).value,
        }
    }).then(function(){
        location.reload();
    });
}