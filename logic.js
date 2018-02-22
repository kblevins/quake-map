// Create a map object
var myMap = L.map("map", {
  center: [25,0],
  zoom: 2,
  minZoom: 2,
  maxBounds: [
    [90, 180],
    [-90, -180]
  ]
});

// Add a tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/kkblevins/cjdxmkc6401qc2soann3dh1b9/tiles/256/{z}/{x}/{y}?"+
"access_token=pk.eyJ1Ijoia2tibGV2aW5zIiwiYSI6ImNqZGhqeWlxaDBiZ2kydnNhYTlseDE3eTYifQ.EWlCoyNVcod37iJ0nUdG3w"
  
).addTo(myMap);
/*
L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?'+
'apikey=98cf750135e240ae8dae43a3f5e455b6'
).addTo(myMap);
*/
var Httpreq = new XMLHttpRequest(); // a new request
Httpreq.open("GET",'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',false);
Httpreq.send(null);
Httpreq.responseText

var json_obj = JSON.parse(Httpreq.responseText);


function markerSize(num) {
  return num;
}

//var color_list = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c']

var color_list = ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15']

// Loop through the cities array and create one marker for each city, 
// bind a popup containing its name and population add it to the map
for (var i = 0; i < json_obj.features.length; i++) {
  var feature = json_obj.features[i];
  var loc = feature.geometry.coordinates;
  var magnitude = feature.properties.mag;
  if (magnitude < 1){
    col = color_list[0]
  } else if (magnitude >= 1 && magnitude < 2){
    col = color_list[1]
  } else if (magnitude >= 2 && magnitude < 3){
    col = color_list[2]
  } else if (magnitude >= 3 && magnitude < 4){
    col = color_list[3]
  } else if (magnitude >= 4 && magnitude < 5){
    col = color_list[4]
  } else {
    col = color_list[5]
  }
  L.circleMarker([loc[1], loc[0]], {
    fillOpacity: 1,
    color: col,
    fillColor: col,
    radius: markerSize(magnitude)
  }).bindPopup("<h3>Magnitude " + magnitude + "</h3>")
    .addTo(myMap);
}


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
      
        grades = [0,1,2,3,4,5];
        div.innerHTML = '<h3>Magnitude</h3>'
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + color_list[i] + '; color:' + color_list[i] + ';">....</i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '++');
  }
  return div;
};

legend.addTo(myMap);
