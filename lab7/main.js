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
   x: Average temperature (°F)
   y: total food consumed (calories)
*/

let dataset = [{x:16, y:1160},
               {x:17, y:1396},
               {x:14.5, y:1480},
               {x:13.5, y:1550},
               {x:14, y:1507},
               {x:14, y:1380},
               {x:16, y:1400},
               {x:14, y:1670},
               {x:15, y:1865},
               {x:13, y:1640},
               {x:12.5, y:1360},
               {x:13, y:1400},
               {x:11, y:1750},
               {x:12.5, y:1406},
               {x:12.5, y:1289},
               {x:13, y:1370},
               {x:22, y:1084},
               {x:11.5, y:1815},
               {x:10.5, y:1530},
               {x:10, y:1930}];

let xScale = d3.scaleLinear()
    .domain([10, 22]) //low to high temperature (°C)//
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([1084, 1930])// low to high food consumed (kcal) //
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
    .attr("cx", function (value) {
        return xScale(value.x);
    })
    .attr("cy", function (value) {
        return yScale(value.y);
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
    .text("Low temp(10) / Low food(1084)");

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
