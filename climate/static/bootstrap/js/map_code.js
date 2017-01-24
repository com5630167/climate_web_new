  //------------Select lat lng ---------------
         var lon = {{lon|safe}}
         var lat = {{lat|safe}}
         var lon1 = {{lon1_g|safe}}
         var lon2 = {{lon2_g|safe}}
         var lat1 = {{lat1_g|safe}}
         var lat2 = {{lat2_g|safe}}
         val_cut = []
        //------------Avg year---------------
           var tem_avg = {{dat|safe}}
           var pre_avg = {{per_y|safe}}
        //------------min year---------------
           var tem_min = {{min_t|safe}}
           var pre_min = {{min_p|safe}}
        //------------max year---------------
           var tem_max = {{max_t|safe}}
           var pre_max = {{max_p|safe}}
        //------------Climdex-----------------
           var txx = {{TXX|safe}}
           var tnx = {{TNX|safe}}
           var txn = {{TXN|safe}}
           var tnn = {{TNN|safe}}
           var tn10p = {{Tn10p|safe}}
           var tx10p = {{Tx10p|safe}}
           var tn90p = {{Tn90p|safe}}
           var tx90p = {{Tx90p|safe}}
           var rx1day = {{Rx1day|safe}}
           var rx5day = {{Rx5day|safe}}

           var su = {{SU|safe}}
           var fd = {{FD|safe}}
           var id = {{ID|safe}}
           var tr = {{TR|safe}}
           var gsl = {{GSL|safe}}
           var wsdi = {{WSDI|safe}}
           var csdi = {{CSDI|safe}}
           var dtr = {{DTR|safe}}
           var sdii = {{SDII|safe}}
           var r10mm = {{R10mm|safe}}
           var r20mm = {{R20mm|safe}}
           var rnnmm = {{Rnnmm|safe}}
           var cdd = {{CDD|safe}}
           var cwd = {{CWD|safe}}
           var r95ptot = {{R95ptot|safe}}
           var r99ptot = {{R99ptot|safe}}
           var prcptot = {{Prcptot|safe}}

 ///////////////////////////////////////////////////////////////////////////
//////////////////// Funtuon Make Map Carto and Layer /////////////////////
///////////////////////////////////////////////////////////////////////////


function makeBaseMaps() {

    indColor = 0;
    IndexLayer = [];
    labelname = "TempMax";
    base = [0,1,2];
    IndexState = $( "#index" ).val();

    mapP = d3.carto.map();
    d3.select("#map_p").call(mapP);
    mapP.centerOn([114,8],"latlong");
    mapP.setScale(3);


    SelectIndex(IndexState)
    createLayer(indState,labelname,indColor,base[0]);
    //map.addCartoLayer(wcLayer).addCartoLayer(TemperatureMax);

    //createLayer(indState,labelname,indColor,base[1]);
    mapP.refresh();
    //legenColor();
    IndexState = 0;

//d3.select("#buttons").append("button").html("Delete a Random Data Layer").on("click", deleteRandomDataLayer)
//d3.select("vars").html(this.value).on("click", deleteRandomDataLayer)

}
///////////////////////////////////////////////////////////////////////////
//////////////////// Function Select Index ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function updatDataLayer(){
    //d3.select("#map").selectAll("svg").remove();
   // var colorLayer;
   // colorLayer.

}

///////////////////////////////////////////////////////////////////////////
//////////////////// Function Select Index ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function SelectIndex(IndexState){
    if (IndexLayer.length > 0){
        mapP.deleteCartoLayer(newSelectIndexLayer);
        mapP.refresh();
    };
    if (IndexState=='avg'){
        indState = "../static/data/geoTsPrAvg.json";
        labelname = "TempAvg";
    }else if(IndexState=='min'){
        indState = "../static/data/geoTsPrMin.json";
        labelname = "TempMin";
    }else if(IndexState=='max'){
        indState = "../static/data/geoTsPrMax.json";
        labelname = "TempMax";
    }
    createLayer(indState,labelname,0,1);
};

function deleteLayer(layername){
    mapP.deleteCartoLayer(layername);
    mapP.refresh();
}

///////////////////////////////////////////////////////////////////////////
//////////////////// Function Create Layear ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
function createLayer(file,lablename,ind,base){
   var regionColor = d3.scale.quantize().domain([-10,50]).range(coloursRainbow)
   if (base==0){
      waterlayer = d3.carto.layer.tile();
      waterlayer
       .tileType("cartodb")
       .path("light_all")
       .label("Base")
       .visibility(true)
      mapP.addCartoLayer(waterlayer);
    }else if(base==1){
      newSelectIndexLayer = d3.carto.layer.geojson();
      newSelectIndexLayer
       .path(file)
       .renderMode("canvas")
       .label(lablename)
       .cssClass("region")
       .clickableFeatures(true)
       .markerColor(function(d) {return regionColor(d.properties.ts[ind])})
       //.on("load", colorByGDP)
       .visibility(true);
      mapP.addCartoLayer(newSelectIndexLayer);
      IndexLayer.push(newSelectIndexLayer);
    };  

    function colorByGDP() {
      d3.selectAll("path.region").style("fill", function(d) {return regionColor(d.properties.ts[ind])})
    }
};
