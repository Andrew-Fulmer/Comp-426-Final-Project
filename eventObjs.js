
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

let testDates1 = new eventDates("taylor",[new Date("2019-12-07"),new Date("2019-12-05")]);
let testDates2 = new eventDates("haven",[new Date("2019-12-05"), new Date("2019-12-06"), new Date("2019-12-11")]);
console.table(testDates1);
let testEvent1 = new Event("taylor",true,6,testDates1);
console.table(testEvent1);
testEvent1.addNewPossibleDates(testDates2);
console.table(testEvent1);
console.table(testEvent1.eventInfo.possibleDates);

