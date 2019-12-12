$(document).ready(function(){
    autocomplete();
    getEvents();
    
    $(".selectEvent").on("click", function(id){   // Might need to make id name
        console.log("you clicked search button");
        searchButton();
        modalViewEventOn();
    });
    /*$("#closePopup12").on("click", function(){
        console.log("you clicked to close");
        modalViewEventOff();
    });*/

});

var eventList = [];
var idList = [];


async function searchButton(){

    $("#closePopup12").on("click", function(){
        console.log("you clicked to close");
        modalViewEventOff();
    });


    var input = document.getElementById("tags").value;
    console.log(input);
    var event = 0;
    let eventPop;
    
    
    eventPop+=    `<div class="modal" id="modalEventPopup">
                        <div class="modal-background closeP"id="closeSelectP"></div>
                        <div class="modal-close closeP"id="closePopup12"></div>
                        <div class="modal-content">
                            <div class="card">
                                <div class="card-content">`+
                                    '<article class="media box" id="event-'+event.id+'">'+
                                        '<div class="media-left">'+
                                        '</div>'+
                                        '<div class="media-content">'+
                                            '<h1 class="title" id="name-'+event.id+'">'+event.eventName+'</h1>'+
                                            '<h2 class="subtitle">Your Event</h2>'+
                                            '<p id="des-'+event.id+'">Event Description:'+event.eventDescription+'</p>'+
                                            '<p id="len-'+event.id+'">Length:'+event.length+'</p>'+
                                            '<p id="members-'+event.id+'">Members:'+event.members.toString()+'</p>'+
                                            '<br>'+
                                            // Do we need the join event button? or should you already be in it?
                                            '<button class="button is-rounded is-info" id="joinEvent-'+event.id+'">Join Event</button>'+
                                            '<button class="button is-rounded is-warning" id="editEvent-'+event.id+'">Edit Event</button>'+
                                            '<button class="button is-rounded is-danger" id="deleteEvent-'+event.id+'">Delete Event</button>' +
                                            '<div id="edit-'+event.id+'"></div>'+
                                        '</div>'+
                                    '</article>'+`
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    $("#eventpopup").append(eventPop);


}

async function modalViewEventOn() {
    $("#modalEventPopup").addClass("is-active");
}

async function modalViewEventOff() {
    console.log('attempting to close modalViewEvent');
    $("#modalEventPopup").removeClass("is-active");
}

async function getEvents(){
    const getEvents = await $.ajax({
        method:'get',
        url: 'http://localhost:3000/private/getEvents',
    });
    //eventList.push(getEvents.result);
    //console.log('HERE YOU GO'+eventList[0].eventName);

    //console.table(getEvents.result);
    renderEvents(getEvents.result);
}

async function renderEvents(events){
    events.forEach(function(event){
        renderEventCard(event);
        //console.log('it should have rendered the event')
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
    var arrMem = event.members;
    eventList.push(event.eventName);
    idList.push(event.id);
    console.log(event.id);
    console.log(eventList);
    console.log('id list' + idList);
    console.log('Members: '+arrMem[0]);
    //console.log('about to render');
    let card;
    if (event.isMine == "true") {
        card =$(
            '<article class="media box" id="event-'+event.id+'">'+
            '<div class="media-left">'+
            '</div>'+
            '<div class="media-content">'+
                '<h1 class="title" id="name-'+event.id+'">'+event.eventName+'</h1>'+
                '<h2 class="subtitle">Your Event</h2>'+
                '<p id="des-'+event.id+'">Event Description:'+event.eventDescription+'</p>'+
                '<p id="len-'+event.id+'">Length:'+event.length+'</p>'+
                '<p id="members-'+event.id+'">Members:'+event.members.toString()+'</p>'+
                '<br>'+
                // Do we need the join event button? or should you already be in it?
                '<button class="button is-rounded is-info" id="joinEvent-'+event.id+'">Join Event</button>'+
                '<button class="button is-rounded is-warning" id="editEvent-'+event.id+'">Edit Event</button>'+
                '<button class="button is-rounded is-danger" id="deleteEvent-'+event.id+'">Delete Event</button>' +
                '<div id="edit-'+event.id+'"></div>'+
            '</div>'+
        '</article>'
        );
    }
    else {
        card =$(
            '<article class="media box" id="event-'+event.id+'">'+
            '<div class="media-left">'+
            '</div>'+
            '<div class="media-content">'+
                '<h1 class="title" id="name-'+event.id+'">'+event.eventName+'</h1>'+
                '<p id="des-'+event.id+'">Event Description:'+event.eventDescription+'</p>'+
                '<p id="len-'+event.id+'">Length:'+event.length+'</p>'+
                '<p id="members-'+event.id+'">Members:'+event.members.toString()+'</p>'+
                '<br>'+
                /*if (arrMem.includes(myName)) {
                    '<button class="button is-rounded is-info" id="leaveEvent-'+event.id+'">Leave Event</button>'+
                }*/
                //else '<button class="button is-rounded is-info" id="joinEvent-'+event.id+'">Join Event</button>'+
                '<button class="button is-rounded is-info" id="joinEvent-'+event.id+'">Join Event</button>'+
                '<div id="edit-'+event.id+'"></div>'+
            '</div>'+
        '</article>'
        );
    };


    let form = $(
        `<div class="modal" id="modalPopup">
            <div class="modal-background closeP"id="closeP"></div>
            <div class="modal-close closeP"id="closePopup"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">Time Available</p>
                                <p class="subtitle is-6">Mark each interval you're available</p>
                            </div>
                        </div>
                        <div class="content">
                            <br>
                            <div class="columns">
                                <div class="column">   
                                    Overnight<br>    
                                    <label class="checkbox">
                                        <input id="cb0" type="checkbox">
                                        12:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb1" type="checkbox">
                                        12:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb2" type="checkbox">
                                        1:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb3" type="checkbox">
                                        1:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb4" type="checkbox">
                                        2:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb5" type="checkbox">
                                        2:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb6" type="checkbox">
                                        3:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb7" type="checkbox">
                                        3:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb8" type="checkbox">
                                        4:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb9" type="checkbox">
                                        4:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb10" type="checkbox">
                                        5:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb11" type="checkbox">
                                        5:30 am
                                    </label><br>
                                </div>
                                <div class="column">
                                    Morning <br>
                                    <label class="checkbox">
                                        <input id="cb12" type="checkbox">
                                        6:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb13" type="checkbox">
                                        6:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb14" type="checkbox">
                                        7:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb15" type="checkbox">
                                        7:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb16" type="checkbox">
                                        8:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb17" type="checkbox">
                                        8:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb18" type="checkbox">
                                        9:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb19" type="checkbox">
                                        9:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb20" type="checkbox">
                                        10:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb21" type="checkbox">
                                        10:30 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb22" type="checkbox">
                                        11:00 am
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb23" type="checkbox">
                                        11:30 am
                                    </label><br>
                                </div>
                                <div class="column">
                                    Afternoon <br>
                                    <label class="checkbox">
                                        <input id="cb24" type="checkbox">
                                        12:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb25" type="checkbox">
                                        12:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb26" type="checkbox">
                                        1:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb27" type="checkbox">
                                        1:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb28"  type="checkbox">
                                        2:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb29" type="checkbox">
                                        2:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb30"  type="checkbox">
                                        3:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb31" type="checkbox">
                                        3:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb32"  type="checkbox">
                                        4:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb33" type="checkbox">
                                        4:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb34" type="checkbox">
                                        5:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb35" type="checkbox">
                                        5:30 pm
                                    </label><br>  
                                </div>
                                <div class="column">
                                    Evening <br>
                                    <label class="checkbox">
                                        <input id="cb36" type="checkbox">
                                        6:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb37" type="checkbox">
                                        6:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb38" type="checkbox">
                                        7:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb39"  type="checkbox">
                                        7:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb40" type="checkbox">
                                        8:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb41" type="checkbox">
                                        8:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb42" type="checkbox">
                                        9:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb43"  type="checkbox">
                                        9:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb44" type="checkbox">
                                        10:00 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb45" type="checkbox">
                                        10:30 pm
                                    </label><br>
                                    <label class="checkbox">
                                        <input id="cb46" type="checkbox">
                                        11:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb47">
                                        <input id="cb47" type="checkbox">
                                        11:30 pm
                                    </label><br>
                                </div>
                            </div>
                            <button class="button is-success" id="submitJoin"> Submit </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    );
    
    var isAvail = document.getElementsByClassName(".checkbox").value;
    console.log(isAvail);
    /*for (let i=0;i<48;i++) {
        isAvail[i]
    }*/
    
    $("#eventShow").append(card);
    $("#formpopup").append(form);

    // open modal form
    $("#joinEvent-"+event.id+"").on("click",function(){
        // This will render the form, then call addToGroup with the new values
        modalFormOn(event);
        //addToGroup(event.id);
        // make this pop up a modal, then eventually when you click on that modal it adds to group
    })
    $(".closeP").on("click", function(){
        modalFormOff(event);
    })
    
    $("#submitJoin").on("click", function(){
        submitJoin(event, isAvail);
        //addToGroup(event.id);
    })


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

//renderModalForm to modalFormOn
async function modalFormOn(event) {
    //console.log('attempting to render modal form');
    $("#modalPopup").addClass("is-active");
}
async function modalFormOff(event) {
    //console.log('attempting to turn modal off');
    $("#modalPopup").removeClass("is-active");
}

// Function for submit button on modalForm
async function submitJoin(event, isAvail) {
    var result;
    console.log('attempting to submit form');
    //console.log(isAvail);
    /*for (var i=0; i<isAvail.length; i++) {
        if (isAvail[i].checked) {
            result[i] = 1;
        }
        else result[i]=0;
    }*/
    console.log(result[0] + 'that was it');
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

//// Down here
async function renderSite(){
    //const $root = $('#root');
    autocomplete();
  }

async function autocomplete(){
    $( "#tags" ).autocomplete({ 
        source: eventList
        //source: idList
  
    /* #the tags is the id of the input element 
    source: tags is the list of available tags*/ 
    });
}
  