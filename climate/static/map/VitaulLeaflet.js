/*
  var cupcakeTiles = L.tileLayer('http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/{z}/{x}/{y}.png', {
    maxZoom: 18
  });


  $.getJSON("cupcakes.json", function(data) {
    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
    var map = L.map('cupcake-map').fitBounds(geojson.getBounds());
    cupcakeTiles.addTo(map);
    geojson.addTo(map);
  });
*/

var mapboxAccessToken = ['pk.eyJ1IjoibnB5dXlpaSIsImEiOiJjaXdpbXVpMmUwMDAxMm9xeDZ1cTZsNDZmIn0.mw2jxjTrwk2P3_oGSVQuDw',
'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'];
var mapboxId=['npyuyii.2b7ea1f8','mapbox.streets'];
//var mymap = L.map('map').setView([37.8, -96], 4);
//var mymap = L.map('map').setView([14.57, 105.83], 4);
var mymap = L.map('map_p').setView([10, 120], 4);

var temp = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken[0], {
	maxZoom: 17,
  minZoom: 3,
	attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id:mapboxId[0]
	});
temp.addTo(mymap);

//---Adding Some Color---
//-----------------------
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function tempColor(d) {
    return d > 49 ? '#800026' :
           d > 42  ? '#BD0026' :
           d > 35  ? '#E31A1C' :
           d > 28  ? '#FC4E2A' :
           d > 21   ? '#FD8D3C' :
           d > 14   ? '#FEB24C' :
           d > 7   ? '#FED976' :
                      '#FFEDA0';
}

var tempC = ["#dd3497","#7a0177","#0431B4","#0174DF","#00BFFF","#00FFFF","#00FF00","#FFFF00","#F7D358","#FE9A2E","#FF0000","#B40404","#8A0808","#610B0B"];

function tempCol(d) {
    return d > 45 ? '#610B0B' :
           d > 40  ? '#8A0808' :
           d > 35  ? '#B40404' :
           d > 30  ? '#FF0000' :

           d > 25   ? '#FE9A2E' :
           d > 20   ? '#F7D358' :
           d > 15   ? '#FFFF00' :

           d > 10   ? '#00FF00' :
           d > 5   ? '#00FFFF' :
           d > 0   ? '#00BFFF' :
           d > -5  ? '#0174DF' :
           d > -10  ? '#0431B4' :
           d > -15   ? '#7a0177' :
                     '#dd3497' ;


}












function style(feature) {
    return {
        fillColor: tempColor(feature.properties.allts),
        weight: 0,        //opacity: 1,
        //color: getColor(feature.properties.density),
        opacity:0,
        //dashArray: '3',
        fillOpacity: 0.5
    };
}
/*
function Wstyle(feature) {
    return {
        fillColor: #4682B4,
        weight: 2,        //opacity: 1,
        color: 'white',
        fillOpacity: 1
    };
}
d3.json("us-states.json", function(error, collection) {
  if (error) throw error;

  // code here
}); */


//var ejson = L.geoJson(statesData, {style: style}); countries.json geoTsCut
$.getJSON("../static/data/geoAvgTsPrG9.json", function(data) {
  //document.getElementById("demo").innerHTML = data.properties.point;
  //document.getElementById("demo").innerHTML = data;
  var ejson = L.geoJson(data, {style: style});
  ejson.addTo(mymap);
 });

//---Custom Legend Control--
//--------------------------
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'infoL legend'),
        grades = [ -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + tempCol(grades[i] + 1) + '"></i> ' +
            grades[i] +'&ndash;'+ (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);