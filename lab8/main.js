"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;
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
// svg.append("rect")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-dasharray", "5")
//     .attr("x", margin)
//     .attr("y", margin)
//     .attr("width", svgWidth - margin * 2)
//     .attr("height", svgHeight - margin * 2);

/* Dataset for Lab 8:
   Exploring the relationship between emotion, number of meals, and hot meals percentage.
   Variables:
   emotionalImpact(0-5)
   mealsPerDay
   highTemp(°C)
   hotMealPercent(% of hot meals)
*/

let dataset = [{emotionalImpact:1, mealsPerDay:2, highTemp:20, hotMealPercent:33},
               {emotionalImpact:1, mealsPerDay:2, highTemp:22, hotMealPercent:75},
               {emotionalImpact:2, mealsPerDay:2, highTemp:20, hotMealPercent:80},
               {emotionalImpact:2, mealsPerDay:2, highTemp:16, hotMealPercent:90},
               {emotionalImpact:4, mealsPerDay:3, highTemp:16, hotMealPercent:100},
               {emotionalImpact:2, mealsPerDay:2, highTemp:17, hotMealPercent:100},
               {emotionalImpact:2, mealsPerDay:2, highTemp:18, hotMealPercent:80},
               {emotionalImpact:4, mealsPerDay:2, highTemp:16, hotMealPercent:90},
               {emotionalImpact:4, mealsPerDay:3, highTemp:19, hotMealPercent:90},
               {emotionalImpact:3, mealsPerDay:2, highTemp:15, hotMealPercent:50},
               {emotionalImpact:4, mealsPerDay:2, highTemp:16, hotMealPercent:85},
               {emotionalImpact:3, mealsPerDay:2, highTemp:16, hotMealPercent:80},
               {emotionalImpact:1, mealsPerDay:3, highTemp:16, hotMealPercent:100},
               {emotionalImpact:1, mealsPerDay:3, highTemp:18, hotMealPercent:67},
               {emotionalImpact:3, mealsPerDay:2, highTemp:18, hotMealPercent:80},
               {emotionalImpact:2, mealsPerDay:2, highTemp:17, hotMealPercent:90},
               {emotionalImpact:2, mealsPerDay:2, highTemp:14, hotMealPercent:67},
               {emotionalImpact:3, mealsPerDay:3, highTemp:15, hotMealPercent:67},
               {emotionalImpact:4, mealsPerDay:2, highTemp:12, hotMealPercent:100},
               {emotionalImpact:4, mealsPerDay:3, highTemp:12, hotMealPercent:100}];

svg.append("line")
    .attr("x1", margin)
    .attr("y1", svgHeight - margin)
    .attr("x2", svgWidth - margin)
    .attr("y2", svgHeight - margin)
    .attr("stroke", "black");

svg.append("line")
    .attr("x1", margin)
    .attr("y1", svgHeight - margin)
    .attr("x2", margin)
    .attr("y2", margin)
    .attr("stroke", "black");

/* Sort by hotMealPercent so small circles are on top*/
dataset.sort(function(a, b){
    return b.hotMealPercent - a.hotMealPercent;
});

/* X scale for emotional impact */
let xScale = d3.scaleLinear()
    .domain([0, 5]) 
    .range([margin, svgWidth - margin]);

/* Y scale for meals per day */
let yScale = d3.scaleLinear()
    .domain([0, 4])// from low to high meals per day //
    .range([svgHeight - margin, margin]);

/* rScale controls circle radius by % of hot meals */
let rScale = d3.scaleSqrt()
    .domain([0, 100])
    .range([0, 25]);

// X axis values
for (let i = 0; i <= 5; i++) {
    svg.append("text")
        .classed("axis", true)
        .attr("x", xScale(i))
        .attr("y", svgHeight - margin + 15)
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("fill", "black")
        .text(i)
}

// Y axis values
for (let i = 0; i <= 4; i++) {
    svg.append("text")
        .classed("axis", true)
        .attr("x", margin - 10)
        .attr("y", yScale(i))
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("fill", "black")
        .text(i)
}

/* colorScale controls color by temperature */
let colorScale = d3.scaleLinear()
    .domain([10, 22]) // from low to high temperature //
    .range(["blue", "red"]);

/* draw the circles */
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles
    .attr("cx", function (value) {
        return xScale(value.emotionalImpact);
    })
    .attr("cy", function (value) {
        return yScale(value.mealsPerDay);
    })
    .attr("r", function (value){
        return rScale(value.hotMealPercent)
    })
    .attr("fill", function (value){
        return colorScale(value.highTemp);
    })
    .attr("opacity", 0.5);

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Emotional Impact (0-5)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Meals per Day (0-4)")
    .attr("transform", "rotate(-90)");

svg.append("text")
    .attr("x", svgWidth - 150)
    .attr("y", margin + 30)
    .text("% of Hot Meals");

for (let i = 20; i <= 80; i += 20) {
    svg.append("circle")
        .attr("r", rScale(i))
        .attr("cx", svgWidth - 130)
        .attr("cy", margin + 25 + i * 2)
        .attr("fill", "black")
        .attr("opacity", 0.6);

    svg.append("text")
      .attr("x", svgWidth - 100)
      .attr("y", margin + 25 + i * 2)
      .style("font-size", "14px")
      .text(i + "%");
}

/* legend for color scale (temperature) */
svg.append("text")
    .attr("x", svgWidth - 220)
    .attr("y", svgHeight - 180)
    .text("Temperature (°C)");

svg.append("rect")
    .attr("x", svgWidth - 200)
    .attr("y", svgHeight - 150)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "blue");

svg.append("text")
    .attr("x", svgWidth - 170)
    .attr("y", svgHeight - 135)
    .text("Cold (10°C)");

svg.append("rect")
    .attr("x", svgWidth - 200)
    .attr("y", svgHeight - 110)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "red");

svg.append("text")
    .attr("x", svgWidth - 170)
    .attr("y", svgHeight - 95)
    .text("Warm (22°C)");
    
/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin+40)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Low emotion/ few meals");

/*Add value label at high end of X axis*/
let xHighLabel = svg.append("text")
    .attr("x", xScale(5)-10)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("High emotion (5)");

let yHighLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(4) - 10)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("High meals (4/day)");
