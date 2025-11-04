"use strict"

/* Configuration variables: drawing */
let svgWidth = 750;
let svgHeight = 550;
let margin = 70;

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/* Dataset According to my hypothesis:
   As temperature decreases, total food consumed increases.
   avgTemp: Average temperature (°F)
   totalCalories: total food consumed (calories)
   emotionalImpact: emotional impact level(1-5)
*/

let dataset = [{avgTemp:16, totalCalories:1160, emotionalImpact:1},
               {avgTemp:17, totalCalories:1396, emotionalImpact:1},
               {avgTemp:14.5, totalCalories:1480, emotionalImpact:2},
               {avgTemp:13.5, totalCalories:1550, emotionalImpact:2},
               {avgTemp:14, totalCalories:1507, emotionalImpact:4},
               {avgTemp:14, totalCalories:1380, emotionalImpact:2},
               {avgTemp:16, totalCalories:1400, emotionalImpact:2},
               {avgTemp:14, totalCalories:1670, emotionalImpact:4},
               {avgTemp:15, totalCalories:1865, emotionalImpact:4},
               {avgTemp:13, totalCalories:1640, emotionalImpact:3},
               {avgTemp:12.5, totalCalories:1360, emotionalImpact:4},
               {avgTemp:13, totalCalories:1400, emotionalImpact:3},
               {avgTemp:11, totalCalories:1750, emotionalImpact:1},
               {avgTemp:12.5, totalCalories:1406, emotionalImpact:1},
               {avgTemp:12.5, totalCalories:1289, emotionalImpact:3},
               {avgTemp:13, totalCalories:1370, emotionalImpact:2},
               {avgTemp:22, totalCalories:1084, emotionalImpact:2},
               {avgTemp:11.5, totalCalories:1815, emotionalImpact:3},
               {avgTemp:10.5, totalCalories:1530, emotionalImpact:4},
               {avgTemp:10, totalCalories:1930, emotionalImpact:4}];

let xScale = d3.scaleLinear()
    .domain([10, 22]) //low to high temperature (°C)//
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 1930])// 0 to high food consumed (kcal) //
    .range([svgHeight - margin, margin]);

/* rScale controls circle radius by emotional impact(1-5)*/
let rScale = d3.scaleLinear()
    .domain([0, 5])
    .range([0, 15]); 

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
    .attr("cx", function (value) {
        return xScale(value.avgTemp);
    })
    .attr("cy", function (value) {
        return yScale(value.totalCalories);
    })
    .attr("r", function (value){
        return rScale(value.emotionalImpact)
    })
    .attr("fill", "black")
    .attr("opacity", 0.6);

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Average Temperature (°C)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Total Food Consumed (kcal)")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin+40)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Low temp(10°C)/food(0 kcal)");

/*Add value label at high end of X axis*/
let xHighLabel = svg.append("text")
    .attr("x", xScale(22)-10)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("High temp (22°C)");

/* Add value label at high end of Y axis*/ 
let yHighLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(1930)-10)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("High food (1930 kcal)");

/* Legend (Key for circle size )
Each circle represents one emotional impact level (1-5) */

svg.append("text")
  .attr("x", svgWidth - 220)
  .attr("y", margin + 20)
  .text("Emotional Impact (0–5)");

for (let i = 1; i <= 5; i++) {
  svg.append("circle")
    .attr("r", rScale(i))
    .attr("cx", svgWidth - 180)
    .attr("cy", margin + 20 + i * 35)
    .attr("fill", "black")
    .attr("opacity", 0.6);

  svg.append("text")
    .text("Level " + i)
    .attr("x", svgWidth - 150)
    .attr("y", margin + 20 + i * 35)
    .attr("alignment-baseline", "middle");
}
