///function menuClicked() {
///alert("You clicked the menu");
///}

			//the first variables will hold the XMLHttpRequest() - this must be done outside the function so it will be global
//the second variable hold the layer itself


var client;
var earthquakelayer;
//create code to get the Earthquakes data using an XMLHttpRequest()
function getEarthquakes(){
	client=new XMLHttpRequest();
	client.open('GET',"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson");
	client.onreadystatechange=earthquakeResponds;client.send();
//note don't use earthquakeResponds() with( brackets as that doesn't work
}
//Remove earthquake
function removeEarthquakeData(){
alert('Earthquake data will be removed');
mymap.removeLayer(earthquakelayer);
}

function toggleEarthquakeData(){
	var toggle=false;
	
	if(!toggle) {
    removeEarthquakeData();
  } else {
    getEarthquakes();
  }
  toggle = !toggle;
}



//create the code to wait for response from the data server, and process the response once it is received
function earthquakeResponds(){
if(client.readyState==4){
	var earthquakedata=client.responseText;
	loadEarthquakelayer(earthquakedata);
	}
}
//convert the received data (text) to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata){
//convert text to JSON
var earthquakejson=JSON.parse(earthquakedata);
//add the JSONlayer on to the map
earthquakelayer=L.geoJson(earthquakejson,
{
//use point to layer to create the points
pointToLayer: function(feature, latlng){
	//look at GeoJSON file's properties
	//marker's color depend on the magnitude value
	//also include a popup that shows coords of the earthquakes
	if (feature.properties.mag>1.75){
		return L.marker(latlng,{icon:testMarkerRed}).bindPopup('<b>'+feature.properties.place+'</b>')
		;}
	//if mag is 1.75 or less
	else{
		return L.marker(latlng,{icon:testMarkerPink}).bindPopup('<b>'+feature.properties.place+'</b>')
		};;
	},
}).addTo(mymap);
mymap.fitBounds(earthquakelayer.getBounds());
}


			
			// load the map
			var mymap = L.map('mapid').setView([51.505, -0.09], 13);
			// load the tiles
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,
			attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
			}).addTo(mymap);
			// add a point
			////L.marker([51.5, -0.09]).addTo(mymap).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
			// add a circle
			///L.circle([51.508, -0.11], 500, {
			///color: 'red',
			///fillColor: '#f03',
			///fillOpacity: 0.5
			///}).addTo(mymap).bindPopup("I am a circle.");
			// add a polygon with 3 end points (i.e. a triangle)
			///var myPolygon = L.polygon([
			///[51.509, -0.08],
			///[51.503, -0.06],
			///[51.51, -0.047]
			///],{
			///color: 'red',
			///fillColor: '#f03',
			///fillOpacity: 0.5
			///}).addTo(mymap).bindPopup("I am a polygon.");
			
			
			///document.addEventListener('DOMContentLoaded', function() {
			///	getEarthquakes();
			///	}, false);

var testMarkerRed=L.AwesomeMarkers.icon({
icon:'play',
markerColor:'red'
});
var testMarkerPink=L.AwesomeMarkers.icon({
icon:'play',
markerColor:'pink'
});