var map = L.map("map_p", {center: [10, 120], zoom: 4});
var tiles = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
//tiles.addTo(map);

//var mymap = L.map('map-canvas').setView([10, 120], 4);
var countries = [];
var countriesOverlay = L.d3SvgOverlay(function(sel, proj) {	
  var upd = sel.selectAll('path').data(countries);
  upd.enter()
    .append('path')
    .attr('d', proj.pathFromGeojson)
    .attr('stroke', 'black')
    .attr('fill', '#8c510a')// function(){ return d3.hsl(Math.random() * 360, 0.9, 0.5) })
    .attr('fill-opacity', '1');
  upd.attr('stroke-width', 1 / proj.scale);
});

//L.control.layers({"Geo Tiles": tiles}, {"Countries": countriesOverlay}).addTo(map);

//d3.json("../static/data/world.json", function(data) { countries = data.features; countriesOverlay.addTo(map) });










function tempColor(d) {
    return d > 35  ? '#67001f' :
           d > 33  ? '#b2182b' :
           d > 31  ? '#d6604d' :
           d > 29  ? '#f4a582' :

           d > 27  ? '#fddbc7' :
           d > 25  ? '#ffffbf' :
           d > 23  ? '#d1e5f0' :

           d > 21  ? '#92c5de' :
           d > 19  ? '#4393c3' :
           d > 17  ? '#2166ac' :
                    '#053061' ;
           /*
           d > 13
           d > 11
           d > 9
           d > 7
           d > 5
           d > 3
           d > 1
           d > -1
           d > -3
           d > -5*/


}
function style(feature) {
    return {
        fillColor: tempColor(feature.properties.allts),
        weight: 0,        //opacity: 1,
        //color: getColor(feature.properties.density),
        opacity:0,
        //dashArray: '3',
        fillOpacity: 1
    };
}

//var ejson = L.geoJson(statesData, {style: style}); countries.json geoTsCut
d3.json("../static/data/geoAvgTsPrG9.json", function(data) {
  //document.getElementById("demo").innerHTML = data.properties.point;
  //document.getElementById("demo").innerHTML = data;
  var ejson = L.geoJson(data, {style: style});
  ejson.addTo(map);
 });

//---Custom Legend Control--
//--------------------------
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'infoL legend'),
        //grades = [ -10, -5, 0, 5, 10, 15, 20, 25, 30, 35],

        grades = [ 15, 17, 19, 21, 23, 25, 27, 29, 31, 33],

        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + tempColor(grades[i] + 1) + '"></i> ' +
            grades[i] +'  '+(grades[i + 1] ? '&ndash; ' + grades[i + 1] + '<br>' : '+<br>');
    }
    return div;
};
legend.addTo(map);
