$(document).ready(function(){
    renderSite();
    getEvents();
    
    $(".selectEvent").on("click", function(id){   // Might need to make id name
        console.log("you clicked search button");
        searchButton();
    });

});

var eventList = [];


async function searchButton(){
    

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
    console.log(eventList);
    console.log('Members: '+arrMem[0]);
    //console.log('about to render');
    let card;
    if (event.isMine == "true") {
        card =$(
            '<article class="media box" id="event-'+event.id+'">'+
            '<div class="media-left">'+
            '</div>'+
            '<div class="media-content">'+
                '<p>Your Event</p>'+
                '<p id="name-'+event.id+'">Event Name:'+event.eventName+'</p>'+
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
                '<p id="name-'+event.id+'">Event Name:'+event.eventName+'</p>'+
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
                                    <label class="checkbox"id="cb00">
                                        <input type="checkbox">
                                        12:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb01">
                                        <input type="checkbox">
                                        12:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb02">
                                        <input type="checkbox">
                                        1:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb03">
                                        <input type="checkbox">
                                        1:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb04">
                                        <input type="checkbox">
                                        2:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb05">
                                        <input type="checkbox">
                                        2:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb06">
                                        <input type="checkbox">
                                        3:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb07">
                                        <input type="checkbox">
                                        3:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb08">
                                        <input type="checkbox">
                                        4:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb09">
                                        <input type="checkbox">
                                        4:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb10">
                                        <input type="checkbox">
                                        5:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb11">
                                        <input type="checkbox">
                                        5:30 am
                                    </label><br>
                                </div>
                                <div class="column">
                                    Morning <br>
                                    <label class="checkbox"id="cb12">
                                        <input type="checkbox">
                                        6:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb13">
                                        <input type="checkbox">
                                        6:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb14">
                                        <input type="checkbox">
                                        7:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb15">
                                        <input type="checkbox">
                                        7:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb16">
                                        <input type="checkbox">
                                        8:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb17">
                                        <input type="checkbox">
                                        8:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb18">
                                        <input type="checkbox">
                                        9:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb19">
                                        <input type="checkbox">
                                        9:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb20">
                                        <input type="checkbox">
                                        10:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb21">
                                        <input type="checkbox">
                                        10:30 am
                                    </label><br>
                                    <label class="checkbox"id="cb22">
                                        <input type="checkbox">
                                        11:00 am
                                    </label><br>
                                    <label class="checkbox"id="cb23">
                                        <input type="checkbox">
                                        11:30 am
                                    </label><br>
                                </div>
                                <div class="column">
                                    Afternoon <br>
                                    <label class="checkbox"id="cb24">
                                        <input type="checkbox">
                                        12:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb25">
                                        <input type="checkbox">
                                        12:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb26">
                                        <input type="checkbox">
                                        1:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb27">
                                        <input type="checkbox">
                                        1:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb28">
                                        <input type="checkbox">
                                        2:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb29">
                                        <input type="checkbox">
                                        2:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb30">
                                        <input type="checkbox">
                                        3:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb31">
                                        <input type="checkbox">
                                        3:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb32">
                                        <input type="checkbox">
                                        4:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb33">
                                        <input type="checkbox">
                                        4:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb34">
                                        <input type="checkbox">
                                        5:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb35">
                                        <input type="checkbox">
                                        5:30 pm
                                    </label><br>  
                                </div>
                                <div class="column">
                                    Evening <br>
                                    <label class="checkbox"id="cb36">
                                        <input type="checkbox">
                                        6:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb37">
                                        <input type="checkbox">
                                        6:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb38">
                                        <input type="checkbox">
                                        7:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb39">
                                        <input type="checkbox">
                                        7:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb40">
                                        <input type="checkbox">
                                        8:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb41">
                                        <input type="checkbox">
                                        8:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb42">
                                        <input type="checkbox">
                                        9:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb43">
                                        <input type="checkbox">
                                        9:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb44">
                                        <input type="checkbox">
                                        10:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb45">
                                        <input type="checkbox">
                                        10:30 pm
                                    </label><br>
                                    <label class="checkbox"id="cb46">
                                        <input type="checkbox">
                                        11:00 pm
                                    </label><br>
                                    <label class="checkbox"id="cb47">
                                        <input type="checkbox">
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
async function loadAutocomplete(){
    //const $root = $('root');
    console.log("autocompleting");
    //$root.on()
  }
async function autocomplete(){
    var list1 = [];


//      var list1 = [];
      var tag1 = {
        name: "Andrew",
        location: "india"
      }
      var tag2 = {
        name: "Taylor",
        location: "usa"
      }
      var tag3 = {
        name: "Caroline",
        location: "china"
      }
      list1.push(tag1.name);
      list1.push(tag2.name);
      list1.push(tag3.name);
  
      $( "#tags" ).autocomplete({ 
        source: eventList
  
    /* #the tags is the id of the input element 
    source: tags is the list of available tags*/ 
      });
  }
  