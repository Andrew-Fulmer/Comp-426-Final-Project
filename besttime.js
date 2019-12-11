
// Going to be moved whenever we actually implement it
// Check who is available
function isAvail(event, time) {
    // event is the event we want to check, 
    // time is the time we want to see how many people are available
    var count = 0;

    for (let i=0; i<event.eventInfo.members.length(); i++){
        // if this member is available at this time, count++
        if (event.eventInfo.members[i].avail[time] == 1) count++;   
    }
    return count;
}

// Function to check all times in 24 hour span and give the amount of ppl available at each time
function checkTimes(event) {
    // time 0 is midnight, 1 is 12:30am, 2 is 1am, ... , 24 is 12pm, 25 is 12:30pm

    // Create array for each hour, with each 
    var peopleAvail = [];
    for (let i=0; i<48; i++) {
        peopleAvail.push(isAvail(event, i));
    }

    // Console.
    for (let i=0; i<48; i++) {
        console.log('At '+ toTime(i) + ' ' + peopleAvail[i] + ' are available');
    }
}

function toTime(num) {
    var result;
    var hours;
    var ampm;
    var onHour = '00';
    var onHalfHour = '30';

    if (number >= 24) {
        ampm = ' pm';
        number = num - 24;
    }
    else {
        ampm = ' am';
        number = num;
    }

    if (number<24) {
        if (number == 0) {
            hours = 12;
            result = hours + ':' + onHour + ampm;
        }
        if (number == 1) {
            hours = 12;
            result = hours + ':' + onHalfHour + ampm;
        } 
        else {
            hours = Math.floor(number/2);
            if (number%2 == 0) {
                result = hours + ':' + onHour + ampm;
            }
            else {
                result = hours + ':' + onHalfHour + ampm;
            }
        }
    }
    return result;
}

async function getEvents(){
    const getEvents = await $.ajax({
        method:'get',
        url: 'http://localhost:3000/private/getEvents',
    });

    console.table(getEvents.result);
    renderEvents(getEvents.result);
}