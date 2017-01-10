
var meta1nJson={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -38.3613558,
          -8.8044875
        ]
      },
      "properties": {
        "Ordem": "193",
        "Eixo": "Leste",
        "Meta": "1L",
        "Municipio": "Petrolândia",
        "Estado": "PE",
        "Nome da Comunidade": "Agrovila 4"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -38.3445892,
          -8.7940031
        ]
      },
      "properties": {
        "Ordem": "194",
        "Eixo": "Leste",
        "Meta": "1L",
        "Municipio": "Petrolândia / Floresta",
        "Estado": "PE",
        "Nome da Comunidade": "Agrovila 5"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -37.8521847,
          -8.6774657
        ]
      },
      "properties": {
        "Ordem": "195",
        "Eixo": "Leste",
        "Meta": "1L",
        "Municipio": "InajÃ¡/Ibimirim",
        "Estado": "PE",
        "Nome da Comunidade": "Indígena KambiwÃ¡ - Baxa da Alexandra"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -37.9229577,
          -8.645232
        ]
      },
      "properties": {
        "Ordem": "196",
        "Eixo": "Leste",
        "Meta": "1L",
        "Municipio": "InajÃ¡",
        "Estado": "PE",
        "Nome da Comunidade": "Indígena KambiwÃ¡ -  BarracÃ£o"
      }
    }
  ]
};
var map = L.map('map', {
    center: [14, 100],
    zoom: 3
});

L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox &copy; OpenStreetMap</a>',
      subdomains: ['a','b','c','d'],
      mapId: 'npyuyii.2b7ea1f8',
      token: 'pk.eyJ1IjoibnB5dXlpaSIsImEiOiJjaXdpbXVpMmUwMDAxMm9xeDZ1cTZsNDZmIn0.mw2jxjTrwk2P3_oGSVQuDw'
}).addTo(map);

L.geoJson(meta1nJson).addTo(map);
        // Let's create a polygon with GeoJson data

        var geoJson_polygon = {
           "type":"Feature",
           "geometry":{
                "type": "Polygon",
                "coordinates": [[
                    [6, 6],
                    [7, 7],
                    [5, 3],
                    [3, 4]
                ]]
            },
            "someOptionalData":"someData"
        }

        //And will add it on the map

        L.geoJson(geoJson_polygon,{
           style: {
               "color": "#ff7800",
               "weight": 5,
               "opacity": 0.65
            }
        }).addTo(map);
/*        
L.geoJson(statesData).addTo(map);

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

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);*/
     
/*var geoc = [{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"point": [89.49, -14.81], "ps": [], "ts": -8}, "geometry": {"type": "Polygon", "coordinates": [[[89.38, -14.92], [89.38, -14.705], [89.605, -14.705], [89.605, -14.92], [89.38, -14.92]]]}}, {"type": "Feature", "properties": {"point": [89.72, -14.81], "ps": [], "ts": -2}, "geometry": {"type": "Polygon", "coordinates": [[[89.605, -14.92], [89.605, -14.705], [89.83, -14.705], [89.83, -14.92], [89.605, -14.92]]]}}, {"type": "Feature", "properties": {"point": [89.94, -14.81], "ps": [], "ts": 4}, "geometry": {"type": "Polygon", "coordinates": [[[89.83, -14.92], [89.83, -14.705], [90.055, -14.705], [90.055, -14.92], [89.83, -14.92]]]}}, {"type": "Feature", "properties": {"point": [90.17, -14.81], "ps": [], "ts": 27.2738}, "geometry": {"type": "Polygon", "coordinates": [[[90.055, -14.92], [90.055, -14.705], [90.28, -14.705], [90.28, -14.92], [90.055, -14.92]]]}}, {"type": "Feature", "properties": {"point": [90.39, -14.81], "ps": [], "ts": 27.2723}, "geometry": {"type": "Polygon", "coordinates": [[[90.28, -14.92], [90.28, -14.705], [90.505, -14.705], [90.505, -14.92], [90.28, -14.92]]]}}]}]*/
/*
L.geoJson(geoc).addTo(map);
    function tgColor(d) {
        return d > 40 ? '#800026' :
               d > 22  ? '#BD0026' :
               d > 16  ? '#E31A1C' :
               d > 10  ? '#FC4E2A' :
               d > 4   ? '#FD8D3C' :
               d > -2   ? '#FEB24C' :
               d > -8   ? '#FED976' :
                          '#FFEDA0';
    }

    function tstyl(feature) {
        return {
        fillColor: tgColor(feature.properties.ts),
        weight: 1,
        opacity: 1,
        color: tgColor(feature.properties.ts),
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(geoc, {style: tstyl}).addTo(map);
*/


function makeColorTs(data){
    L.geoJson(data).addTo(map);
    function gColor(d) {
        return d > 40 ? '#800026' :
               d > 22  ? '#BD0026' :
               d > 16  ? '#E31A1C' :
               d > 10  ? '#FC4E2A' :
               d > 4   ? '#FD8D3C' :
               d > -2   ? '#FEB24C' :
               d > -8   ? '#FED976' :
                          '#FFEDA0';
    }

    function styl(feature) {
        return {
        fillColor: gColor(feature.properties.ts),
        weight: 1,
        opacity: 1,
        color: gColor(feature.properties.ts),
        dashArray: '3',
        fillOpacity: 0.7
    };
}

    L.geoJson(data, {style: styl}).addTo(map);
}
/*       L.geoJson(geoc,{
           style: {
               "color": "#ff7800",
               "weight": 5,
               "opacity": 0.65
            }
        }).addTo(map);
*/


