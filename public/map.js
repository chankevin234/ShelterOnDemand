var locations = {
  "Good Shepherd Ministries, 412 Queen St E, Toronto, ON M5A 1T3":[43.65622432647706, -79.3625111],
  "Angela's Place, 45 Glenn Hawthorne Blvd, Mississauga, ON L5R 4J9":[43.612169611176576, -79.66202861691681],
  "Salvation Army Wilkinson Road Shelter, 15 Wilkinson Rd, Brampton, ON L6T 4M3":[43.69002956864505, -79.7026814154038],
  "Cawthra Shelter, 2500 Cawthra Rd, Mississauga, ON L5E 2X3":[43.592569808646275, -79.59779544389993],

}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    
    
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: {lat:43.7743505336424, lng:-79.43714173854273},
    });
  }
  
  //get map location
  function pinMapLocation() {
    var e = document.getElementById("location");
    var name = e.options[e.selectedIndex].text;
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: {lat:43.7743505336424, lng:-79.43714173854273},
    });
    const marker = new google.maps.Marker({
      position: {lat: locations[name][0], lng: locations[name][1]},
      map: map,
    });
  }

