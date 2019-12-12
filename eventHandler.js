$(document).ready(function(){


    $("#eventButton").on("click",function(){
        var message="";
        var failed = false;
        var acceptable = false;
        if (document.getElementById("eventName").value == ""){
            console.log('There is no event name');
            message+= 'Please add an event name \n';
            var failed = true;
            //alert('Please add an event name');
        }
        if (document.getElementById("timeSpan").value == "") {
            console.log('There is no time span');
            message+= 'Please add a time span \n';
            var failed = true;
        }
        if (document.getElementById("eventDes").value == "") {
            console.log('There is no description');
            message+= `You're missing a description but can still submit \n`;
            var acceptable = true;
        }
        if (failed) {
            alert(message);
        }
        else if (acceptable) {
            alert(message);
        }
        else {
            console.log('successfully added event');
            generateNewEvent(document.getElementById("eventName").value,document.getElementById("eventDes").value,document.getElementById("timeSpan").value,document.getElementById("datePicker").value);
            console.log('999'+ document.getElementById("datePicker").value);
            // maybe add a popup saying you successfully added event -> could have this just add is-active
        }
    });

    $("#getEvents").on("click",function(){
        getEvents();
    });

    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2019,
        maxYear: 2025,/*parseInt(moment().format('YYYY'),10)*/
    }, function(start, end, label) {
        var pops = moment().format('MM/DD/YYYY', start);
        moment().format()
        //console.log(pops);
        //var years = moment().diff(start, 'years');
        console.log('pops = ' + pops);
    });

    showWeather();
    
});

/*async function searchForDuplicates(event) {
    for (let i=0; i<getEvents.length; i++) {
        console.log(i);
    };
}*/

// ADDED DATE HERE
async function generateNewEvent(name,des,length,date){
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

async function showWeather(){
    var key = "621b1636f684462b49976020129b8867";
    var city = "Chapel Hill";
    var url = "https://api.openweathermap.org/data/2.5/forecast";
    console.log('running main');
    $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            q: city,
            appid: key,
            units: "imperial",
            cnt: "10"
        },
    
        success: function(data) {
            
            var date = new Date();
            var day = date.getDay();
            console.log('today is '+date);
            console.log('number of today is '+day);
            console.log(data.list);
            //var test = today.prototype.getDay();
            //console.log('seve');
            //console.log('howdy from: ' + today.prototype.getDay());
            var arrDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            if (day==0) var today = 'Sunday';
            if (day==1) var today = 'Monday';
            if (day==2) var today = 'Tuesday';
            if (day==3) var today = 'Wednesday';
            if (day==4) var today = 'Thursday';
            if (day==5) var today = 'Friday';
            if (day==6) var today = 'Saturday';

            var pt = "";
            pt += `<h1 class="title">` +data.city.name + "</h1>";

            for (let i=0; i<10; i++) {
                pt += "<p>";
                if (i==0) pt+= `<b class="has-text-grey">Today</b>: `;
                else if (i==1) pt+= `<b class="has-text-grey">Tomorrow</b>: `;
                else if (i<7) {
                    pt+= `<b class="has-text-grey">` + arrDays[day+i] + "</b>: ";
                }
                else {
                    pt+= `<b class="has-text-grey">Next ` + arrDays[day+i] + "</b>: "
                }
                pt+= data.list[i].main.temp + "&degF" //temp
            }
            /*$.each(data.list, function(index, val){

            });*/


            /*var weather = "";
            weather += "<h2>" + data.city.name + "</h2>"; // City (displays once)
            $.each(data.list, function(index, val) {
                

                weather += "<p>" // Opening paragraph tag
                if (index==0) weather+= "<b>Today </b>: "
                else if (index==1) weather+= "<b>Tomorrow "
                else if (index==2) weather+= "<b>Day after tomorrow"
                else weather += "<b> " + (index-1) + " days after tomorrow</b>: " // Day
                //weather += "<b>Day " + index + "</b>: " // Day

                weather += val.main.temp + "&degF" // Temperature
                weather += "<span> | " + val.weather[0].description + "</span>"; // Description
                weather += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                weather += "</p>" // Closing paragraph tag
                //if (count>6) break;
            });*/
                //$("#showWeatherForcast").html(weather);
            $("#showWeather").append(pt);
        }
    });
}

//$("#eventShow").append(card);