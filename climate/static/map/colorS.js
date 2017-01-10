
///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	

var somData = [-10,0,10,20,30,40,50];

var MapColumns = 30,
	MapRows = 2;

var margin = {
	top: 0,
	right: 30,
	bottom: 120,
	left: 20
};


//First try for width
var width = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 20;
var height = window.innerHeight - margin.top - margin.bottom - 20;

	
//Set the new height and width based on the max possible
var width = 800;
var height = 20;

//SVG container
var svg = d3.select('#chart')
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//Reset the overall font size
var newFontSize = width * 62.5 / 800;
d3.select("html").style("font-size", newFontSize + "%");
	
//Format to display numbers
var formatPercent = d3.format("%");
	
//Needed for gradients			
var defs = svg.append("defs");

///////////////////////////////////////////////////////////////////////////
//////////// Get continuous color scale for the Rainbow ///////////////////
///////////////////////////////////////////////////////////////////////////
var colorPr= ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"];
var coloursRainbow = ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"];
var colourRangeRainbow = d3.range(0, 1, 1.0 / (coloursRainbow.length - 1));
colourRangeRainbow.push(1);
		   
//Create color gradient
var colorScaleRainbow = d3.scale.linear()
	.domain(colourRangeRainbow)
	.range(coloursRainbow)
	.interpolate(d3.interpolateHcl);

//Needed to map the values of the dataset to the color scale
var colorInterpolateRainbow = d3.scale.linear()
	.domain(d3.extent(somData))
	.range([0,1]);

///////////////////////////////////////////////////////////////////////////
//////////////////// Create the Rainbow color gradient ////////////////////
///////////////////////////////////////////////////////////////////////////

//Calculate the gradient	
defs.append("linearGradient")
	.attr("id", "gradient-rainbow-colors")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.selectAll("stop") 
	.data(coloursRainbow)                  
	.enter().append("stop") 
	.attr("offset", function(d,i) { return i/(coloursRainbow.length-1); })   
	.attr("stop-color", function(d) { return d; });

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//function legenColor(){
var legendWidth = width * 0.6,
	legendHeight = 10;

//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(" + (width/3 +20) + "," + (height+30) + ")");

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", 10)
	//.attr("rx", legendHeight/2)
	.attr("width", legendWidth)
	.attr("height", legendHeight)
	.style("fill", "none");
	
//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", -2)
	.text("Temperature ( ํC)");

//Set scale for x-axis
var xScale = d3.scale.linear()
	 .range([0, legendWidth])
	 .domain([-10,50]);
	 //.domain([d3.min(pt.legendSOM.colorData)/100, d3.max(pt.legendSOM.colorData)/100]);

//Define x-axis
var xAxis = d3.svg.axis()
	  .orient("bottom")
	  .ticks(5)  //Set rough # of ticks
	  //.tickFormat(formatPercent)
	  .scale(xScale);

//Set up X axis
legendsvg.append("g")
	.attr("class", "axis")  //Assign "axis" class
	.attr("transform", "translate(" + (-legendWidth/2) + "," + (10 + legendHeight) + ")")
	.call(xAxis);
//}
///////////////////////////////////////////////////////////////////////////
////////////////////////// Color Interactions /////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Transition the colors to a rainbow
function updateRainbow() {
	//Fill the legend rectangle
	svg.select(".legendRect")
		.style("fill", "url(#gradient-rainbow-colors)");
}//updateRainbow

//Start set-up
updateRainbow();
var currentFill = "rainbow";


