$( function() { 
  renderSite();
  
} );
export const renderSite = function() {
  //const $root = $('#root');
  autocomplete();
}
export const loadAutocomplete = function() {
  //const $root = $('root');
  console.log("autocompleting");
  //$root.on()
}
export const autocomplete = function() {

    var list1 = [];
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
      source: list1
  
  /* #the tags is the id of the input element 
  source: tags is the list of available tags*/ 
    });
}
