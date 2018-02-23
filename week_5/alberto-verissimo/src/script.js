$(document).ready(function(){

var element = document.getElementById('foursquare-map');
var options = {
  center: new google.maps.LatLng(43.6532, -79.3832),
  zoom: 10,
}
var map = new google.maps.Map(element, options);

// var marker = new google.maps.Marker({
//           position: options.center,
//           map: map
//         });

$.ajax({
  type:'GET',

  dataType:'jsonp',
  cache:false,
  url: 'https://api.foursquare.com/v2/venues/search?client_id=UYXWDL4J1XESVFDVL4IQS4FKZJVLMCOF0SKNRRWRBBSC0LPE&client_secret=IFYVZGRK3EVI4DF1JEND5ZHC1K15NP5GAZ3NKXPOVCELZQSL&v=20180212&near=Toronto&query=tacos',
  success:function(response){
    //console.log(response);
  //  console.log(response.response.venues);
   
      response.response.venues.forEach(function(venue){
        var venueLatLng=new google.maps.LatLng(venue.location.lat, venue.location.lng);
        var marker = new google.maps.Marker({
            map:map,
            position:venueLatLng,
        })//marker

        var infowindow = new google.maps.InfoWindow({
          content: venue.name,
        });//infowindow

        marker.addListener('click', function(){
          infowindow.open(map, marker);
        });

        infowindow.addListener('closeclick', function(){
          map.panTo(this.getPosition());
          map.setZoom(12);
        });

      })//forEach






  },//success
})//ajax

})//Document Ready
