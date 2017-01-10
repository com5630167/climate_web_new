///////////////////////////////////////////////////////////////////////////
//////////////////// Plot Graph Average Max Min ///////////////////////////
///////////////////////////////////////////////////////////////////////////	
//------------Select lat lng ---------------
 var lon = {{lon|safe}}
 var lat = {{lat|safe}}
 var lon1 = {{lon1_g|safe}}
 var lon2 = {{lon2_g|safe}}
 var lat1 = {{lat1_g|safe}}
 var lat2 = {{lat2_g|safe}}
 val_cut = []
 function grd(){
  //document.getElementById("demo").innerHTML = lon.length;
  //document.getElementById("demo1").innerHTML = lat.length;
 }
 grd();
//------------Avg year---------------
   var tem_avg = {{dat|safe}}
   var pre_avg = {{per_y|safe}}
//------------min year---------------
   var tem_min = {{min_t|safe}}
   var pre_min = {{min_p|safe}}
//------------max year---------------
   var tem_max = {{max_t|safe}}
   var pre_max = {{max_p|safe}}
//------------Cal SU-----------------
   var su = {{ind_su|safe}}
   var fd = {{ind_fd|safe}}
   var atr = {{rang_temp|safe}}
// function longitude ---------------

//document.getElementById("demo3").innerHTML = su.length+" days";


 $(function() {
      $( "#slider-3" ).slider({
               range:true,
               min:lon[0],
               max: lon[lon.length-1],
               //orientation: "vertical",
               values: [ lon1, lon2 ],
               slide: function( event, ui ) {
                  $( "#lon" ).val(ui.values[ 0 ]);
                  $( "#lon2" ).val(ui.values[ 1 ]);
                  lon_sel = ui.values[0];
               },
               stop: function( event, ui ) {
                    
                   var lon_1 = ui.values[0];
                   var lon_2 = ui.values[1];
		   /* $.ajax({
			type: 'GET',
			url: "/",
                        dataType: "json",
			data : { 'request_data':lon_1,'request_data2':lon_2},
			success : function(json) {
			    //$("#request-access").hide();
			    //console.log("requested access complete");
                             
			}
                    })*/
               }
       });
    
       $( "#lon" ).val($( "#slider-3" ).slider( "values", 0 ) );
       $( "#lon2" ).val($( "#slider-3" ).slider( "values", 1 ) );
 });
// function lattitude ---------------
 $(function() {
      $( "#slider-4" ).slider({
               range:true,
               min:lat[0],
               max: lat[lat.length-1],
               orientation: "vertical",
               values: [ lat1, lat2 ],
               slide: function( event, ui ) {
                  $( "#lat" ).val(ui.values[ 0 ]);
                  $( "#lat2" ).val(ui.values[ 1 ]);
               }
       });
       $( "#lat" ).val($( "#slider-4" ).slider( "values", 0 ) );
       $( "#lat2" ).val($( "#slider-4" ).slider( "values", 1 ) );
 });
 var customTimeFormat = d3.time.format.multi([
	  [".%L", function(d) { return d.getMilliseconds(); }],
	  [":%S", function(d) { return d.getSeconds(); }],
	  ["%I:%M", function(d) { return d.getMinutes(); }],
	  ["%I %p", function(d) { return d.getHours(); }],
	  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
	  ["%b %d", function(d) { return d.getDate() != 1; }],
	  ["%b", function(d) { return d.getMonth(); }],
	  ["%Y", function() { return true; }]
]);
function interac_chart(data_plot,name,ind) {
   var parseDate = d3.time.format("%Y-%b-%d").parse;
   
    var data = data_plot.map(function(d) {
       return {
          date: parseDate(d[0]),
          close: d[1]
       };
        
     });


  
   //var nim ;
   var margin = {top: 30, right: 40, bottom: 80, left: 40},
    margin2 = {top: 270, right: 40, bottom: 20, left: 40},
    width = 540 - margin.left - margin.right,
    width2 = 540 - margin2.left - margin2.right,
    height = 330 - margin.top - margin.bottom,
    height2 = 310 - margin2.top - margin2.bottom;

   var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([0, width]);

   var y = d3.scale.linear().range([height, 0]),
       y2 = d3.scale.linear().range([height2, 0]);
   var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(customTimeFormat),
       xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
   var yAxis = d3.svg.axis().scale(y).orient("left");
    
   var brush = d3.svg.brush()
    .x(x2)
    .extent(d3.extent(data, function(d) { return d.date; }))
    .on("brushend", brushended);
    //.on("brushend", brusher2);

   var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.close); });

   var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.close); });

   var svg = d3.select("#map1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    
  svg.append("defs").append("clipPath")
     .attr("id", "clip")
     .append("rect")
     .attr("width", width)
     .attr("height", height);
   
   var focus = svg.append("g")
     .attr("class", "focus")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  var context = svg.append("g")
     .attr("class", "context")
     .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
  
    
   var zoom = d3.behavior.zoom().on("zoom", draw);

   var rect = svg.append("svg:rect")
      .attr("class", "pane")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
    
   x.domain(d3.extent(data, function(d) { return d.date; }));
   y.domain(d3.extent(data, function(d) { return d.close; }));
   x2.domain(x.domain());
   y2.domain(y.domain());

   //zoom.x(x);
    focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
    focus.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);
    focus.append("g")
       .attr("class", "y axis")
       .call(yAxis);
    focus.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -(height/2))
       .attr("y",-30 )
       .style("font-family", "sans-serif")
       .style("fill", "#e60000")
       .style("text-anchor", "middle")
       .text(name);
    focus.append("text")
       .attr("x", width+20)
       .attr("y", height+5 )
       .style("font-family", "sans-serif")
       .style("fill", "#e60000")
       .style("text-anchor", "middle")
       .text("years");
    focus.append("text")
       .attr("x", (width/2) )
       .attr("y", -10 )
       .style("fill", "#000033")
       .style("font-family", "sans-serif")
       .style("text-anchor", "middle")
       .attr("font-size", "15px")
       .text(ind+" in 1970-1979");
   context.append("g")
    .attr("class", "x grid")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.svg.axis()
        .scale(x2)
        .orient("bottom")
        .ticks(d3.time.months, 6)
        .tickSize(-height2)
        .tickFormat(""))
    .selectAll(".tick")
    .classed("minor", function(d) { return d.getHours(); });
 
   context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);
   context.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.svg.axis()
      .scale(x2)
      .orient("bottom")
      .ticks(d3.time.years)
      .tickPadding(0))
    .selectAll("text")
    .attr("x", 6)
    .style("text-anchor", null)
    .call(xAxis2);
   context.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.event)
    .selectAll("rect")
    .attr("height", height2);
  
  function brushended() {
   
    var extent0 = brush.extent(),
        extent1 = extent0.map(d3.time.year.round);
        cal_year(extent1,data_plot,ind,name);
 
    if (!d3.event.sourceEvent){
        cal_year(extent1,data_plot,ind,name);
	return;
    } // only transition after input

    // if empty when rounded, use floor & ceil instead
    if (extent1[0] >= extent1[1]) {
        extent1[0] = d3.time.year.floor(extent0[0]);
        extent1[1] = d3.time.year.ceil(extent0[1]);
     }
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    
    d3.select(this).transition()
      .call(brush.extent(extent1))
      .call(brush.event)
      .call(endAll, function () {
       
      });
     
    zoom.x(x);
  }

  function endAll (transition, callback) {
    var n;

    if (transition.empty()) {
        callback();
    }
    else {
        n = transition.size();
        transition.each("end", function () {
            n--;
            focus.select(".x.axis").call(xAxis);
            if (n === 0) {
                focus.select(".area").attr("d", area);
                callback();
            }
        });
    }
  }
  function draw() {
        /*focus.select(".area").attr("d", area);
          focus.select(".x.axis").call(xAxis);
          Force changing brush range
          brush.extent(x.domain());
          svg.select(".brush").call(brush);*/
  }
  
}
function cal_year(rang_year,data,ind,name_var) {
     var parseD = d3.time.format("%Y-%b-%d").parse;
     //document.getElementById("demo").innerHTML = rang_year[0].getFullYear()+","+rang_year[1].getFullYear();
     start = rang_year[0].getFullYear();
     end = rang_year[1].getFullYear();   
     //document.getElementById("demo").innerHTML = data[0];
     var year = [];
     var val = [];
     var year2 = [];
          //var mss = data[0];
      data.forEach(function(d,i) {
          year[i] = parseD(d[0]).getFullYear();
          val[i] = d[1];
          year2[i] = d[0];
      });
      
      e_year = end - start;
      val_cut = [];
      dat_cut = [];
      for(var i = 0;i<val.length;i++){
          if(year[i]>=start&&year[i]<end){
             val_cut.push(val[i-1]);//start index 0
              // val_cut.push(val[i]);//start index 1
             dat_cut.push(year2[i-1]);
            
          }
      }
       for(var i = 0;i<val.length;i++){
          if(year[i]>=start&&year[i]<end){
             val_cut.push(val[i-1]);//start index 0
              // val_cut.push(val[i]);//start index 1
             dat_cut.push(year2[i-1]);
            
          }
      }
      //------------------------------------------------------
      val_sum = [];
      for(var j=0;j<val_cut.length;j++){
           val_cut[j] = val_cut[j] ? val_cut[j] : 0.00;
      }
      for(var j=0;j<12;j++){
           val_sum[j] = 0;
      }
      k = 0;
      count = 0;
      for(var i = 0;i<e_year;i++){
	  for(var j=0;j<12;j++){
                val_sum[j] = val_sum[j]+val_cut[j+count];
           }
           k = k+1;
           count = 12*k;
       }
      val_avg = [];
      //----------------------Calculate------------------------------
      for(var j=0;j<12;j++){
            val_avg[j] = val_sum[j]/e_year;
           /*if(ind == 'avg'){
               val_avg[j] = val_sum[j]/e_year;
           }else if(ind == 'min'){
               val_avg[j] = Math.min.apply(Math, val_sum[j]);
           }else if(ind == 'max'){
               val_avg[j] = Math.max.apply(Math, val_sum[j]);
           }*/
          
      }
      
      //----------------------append---------------------------
      var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      var data_pg = new Array(11);
      for(var i = 0;i<12;i++){
         data_pg[i] = new Array(1);
         for(var j=0;j<2;j++){
              if(j==0){
                   data_pg[i][j] = start+"-"+month[i];// 
               }else if(j==1){
                   data_pg[i][j] = val_avg[i];
               }
         
         }
      }
     //--------------------Call Plot Graph--------------------
     //document.getElementById("demo").innerHTML = data_pg;
     d3.select("#map2").selectAll("svg").remove(); 
     //document.getElementById("demo").innerHTML = da[[0]];
     int_chart(data_pg,name_var,ind,start+"-"+(end-1));
}
function int_chart(mon_plot,name,ind,rang_name) {
    //d3.selectAll("svg > *").remove();
    var margin3 = {top: 30, right: 40, bottom: 110, left: 50},
    width3 = 535 - margin3.left - margin3.right,
    height3 = 390 - margin3.top - margin3.bottom;
    var parseD = d3.time.format("%Y-%b").parse;
    var x3 = d3.time.scale().range([0, width3])
    var y3 = d3.scale.linear().range([height3, 0]);
    var xAxis3 = d3.svg.axis().scale(x3).orient("bottom").tickFormat(customTimeFormat);
    var yAxis3 = d3.svg.axis().scale(y3).orient("left");
    var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x3(d.date); })
    .y(function(d) { return y3(d.close); });
    var svg = d3.select("#map2").append("svg")
     .attr("width", width3 + margin3.left + margin3.right)
     .attr("height", height3 + margin3.top + margin3.bottom)
     .append("g")
     .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
    svg.append("rect")
     .attr("width", width3)
     .attr("height", height3)
     .attr("fill", "#f5f5f0");
   
    var data3 = mon_plot.map(function(d) {
       //document.getElementById("demo").innerHTML = d[0];
       return {
          date: parseD(d[0]),
          close: d[1]
       };
      
     });
     
     x3.domain(d3.extent(data3, function(d) { return d.date; }));
     y3.domain(d3.extent(data3, function(d) { return d.close; }));
 
    svg.append("path")
      .datum(data3) 
      .attr("class", "line")
      .attr("d", line);
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height3 + ")")
       .call(xAxis3);
    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis3);
    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -(height3/2))
       .attr("y",-35 )
       .style("font-family", "sans-serif")
       .style("fill", "#e60000")
       .style("text-anchor", "middle")
       .text(name);
    svg.append("text")
       .attr("x", width3+20)
       .attr("y", height3+5 )
       .style("font-family", "sans-serif")
       .style("fill", "#e60000")
       .style("text-anchor", "middle")
       .text("month");
    svg.append("text")
       .attr("x", width3/2 )
       .attr("y", -10 )
       .style("fill", "#000033")
       .style("font-family", "sans-serif")
       .style("text-anchor", "middle")
       .attr("font-size", "15px")
       .text(ind+" in Jan-Dec of "+rang_name);
}

var indColor=0;

var SelectVar;
//select Temp or Prec -----------------------------

       function displayVals() {
  	     var variable = $( "#vars" ).val();
             var index_val = $( "#index" ).val();
             //var cind = $( "#cindex" ).val();
             //$( "p#demo" ).html( "<b>var:</b> " + variable +"<b>ind:</b> " + cind);
             //select_var(variable,index_val,cind);
             select_var(variable,index_val);
       }
       $( "select" ).change( displayVals );
       displayVals();

       function select_var(x,y){
               //document.getElementById("demo").innerHTML = z;
              if(x==1&&y=='avg'){
                  d3.select("#map1").selectAll("svg").remove();
                  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(tem_avg,"Temperature (°C)",'Average Temperature (°C)');
                  
	      }else if(x==2&&y=='avg'){

                  d3.select("#map1").selectAll("svg").remove();
                  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(pre_avg,"Precipitation (mm)",'Average Precipitation (mm)');
              }else if(x==1&&y=='min'){

                  d3.select("#map1").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(tem_min,"Temperature (°C)",'Minimum Temperature (°C)');
                  
              }else if(x==2&&y=='min'){
                  updateFile(y);
                  d3.select("#map1").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(pre_min,"Precipitation (mm)",'Minimum Precipitation (mm)');
              }else if(x==1&&y=='max'){

                  d3.select("#map1").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(tem_max,"Temperature (°C)",'Maximum Temperature (°C)');
              }else if(x==2&&y=='max'){
                  d3.select("#map1").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(pre_max,"Precipitation (mm)",'Maximum Precipitation (mm)');
              };
             SelectVar=y;
              /*else if(x==1&&z=='su'){
                  d3.select("#map").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(su,"Temperature (°C)",'Number of summer days(SU)');
              }else if(x==1&&z=='fd'){
                  d3.select("#map").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(fd,"Temperature (°C)",'Number of frost days(FD)');
                 
              }else if(x==1&&z=='atr'){
                  d3.select("#map").selectAll("svg").remove();
		  d3.select("#map2").selectAll("svg").remove();
                  interac_chart(atr,"Temperature (°C)",'Daily temperature range(DTR)');
              };*/
   

       }

