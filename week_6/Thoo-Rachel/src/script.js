var map;
var markers = [];
//var lastInfoWindow = null

// initialize the map and listen for any clicks to the search button
$(document).ready(function() {
  initializeMap();

  $('#map-input button').click(function() {
    var term = $('#map-input input').val();
    loadMarkersFromTerm(term);
  });
});

// function to initialize the map to be seen on the screen
function initializeMap() {
  var toronto = new google.maps.LatLng('43.6532', '-79.3832');
  map = new google.maps.Map(document.getElementById('foursquare-map'), {
    center: toronto,
    zoom: 10
  });
}

// load the markers from the term in the input box
function loadMarkersFromTerm(term) {
  var url = 'https://api.foursquare.com/v2/venues/search?client_id=XUXLO0NUOU5C54RCWE2UXF50MHWEL52I1APLQVSMBQJDGFPX&client_secret=0BEDRXQL312RAUAK2M5ON35BLUWSBRNCQDQNKADJ5COXJ4VJ&v=20180212&near=Toronto&query=' + term;

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: url,
    success: function (response) {
      clearMap();
      response.response.venues.forEach(function(venue) {
        addVenueMarkerOnMap(venue);
      });
    }
  })
}

// add the marker and its window to the map
function addVenueMarkerOnMap(venue) {
  var location = venue.location;
  var latlng = new google.maps.LatLng(location.lat, location.lng);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });

  var infoWindow = new google.maps.InfoWindow({ content: venue.name });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
        //if (lastInfoWindow) {
            //lastInfoWindow.close()
         // }
         // lastInfoWindow = infowindow
        //})
        
       // google.maps.event.addListener(infowindow,'closeclick', function(){
          //lastInfoWindow = null
//})
  });

  markers.push(marker);
}

// clear map
function clearMap() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//var contentString = new google.maps.InfoWIndow({
  //content: venue.address});
//google.maps.event.addListener(marker, "click",)functions(){
  //response:contentString}

