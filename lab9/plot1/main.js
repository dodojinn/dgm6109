"use strict";

/* SVG setup */
let svgWidth = 800;
let svgHeight = 600;
let margin = 70;

let svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg
  .append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Full dataset (9/22–10/21)
    high=High Temperature, low=Low Temperature, total=Total Calorie Intake */
let dataset = [
  { date: "9/22", high: 20, low: 12, total: 1160, hotMealPercent: 33 },
  { date: "9/23", high: 22, low: 12, total: 1396, hotMealPercent: 75 },
  { date: "9/24", high: 20, low: 9, total: 1480, hotMealPercent: 80 },
  { date: "9/25", high: 16, low: 11, total: 1550, hotMealPercent: 90 },
  { date: "9/26", high: 16, low: 12, total: 1507, hotMealPercent: 100 },
  { date: "9/27", high: 17, low: 11, total: 1380, hotMealPercent: 100 },
  { date: "9/28", high: 18, low: 14, total: 1400, hotMealPercent: 80 },
  { date: "9/29", high: 16, low: 12, total: 1670, hotMealPercent: 90 },
  { date: "9/30", high: 19, low: 11, total: 1865, hotMealPercent: 90 },
  { date: "10/1", high: 15, low: 11, total: 1640, hotMealPercent: 50 },
  { date: "10/2", high: 16, low: 9, total: 1360, hotMealPercent: 85 },
  { date: "10/3", high: 16, low: 10, total: 1400, hotMealPercent: 80 },
  { date: "10/4", high: 16, low: 6, total: 1750, hotMealPercent: 100 },
  { date: "10/5", high: 18, low: 7, total: 1406, hotMealPercent: 67 },
  { date: "10/6", high: 18, low: 7, total: 1289, hotMealPercent: 80 },
  { date: "10/7", high: 17, low: 9, total: 1370, hotMealPercent: 90 },
  { date: "10/8", high: 14, low: 8, total: 1084, hotMealPercent: 67 },
  { date: "10/9", high: 15, low: 8, total: 1815, hotMealPercent: 67 },
  { date: "10/10", high: 12, low: 9, total: 1530, hotMealPercent: 100 },
  { date: "10/11", high: 12, low: 8, total: 1930, hotMealPercent: 100 },
  { date: "10/12", high: 11, low: 3, total: 1900, hotMealPercent: 100 },
  { date: "10/13", high: 16, low: 2, total: 1436, hotMealPercent: 30 },
  { date: "10/14", high: 14, low: 3, total: 1230, hotMealPercent: 50 },
  { date: "10/15", high: 14, low: 4, total: 1440, hotMealPercent: 60 },
  { date: "10/16", high: 13, low: 8, total: 1750, hotMealPercent: 60 },
  { date: "10/17", high: 14, low: 7, total: 1448, hotMealPercent: 70 },
  { date: "10/18", high: 9, low: 6, total: 1534, hotMealPercent: 100 },
  { date: "10/19", high: 12, low: 5, total: 1650, hotMealPercent: 90 },
  { date: "10/20", high: 12, low: 9, total: 1250, hotMealPercent: 100 },
  { date: "10/21", high: 14, low: 7, total: 1380, hotMealPercent: 90 },
];

/* Compute average temperature */
for (let i = 0; i < dataset.length; i++) {
  let d = dataset[i];
  d.avgTemp = (d.high + d.low) / 2;
}

/* Sort by avgTemp */
dataset.sort(function (a, b) {
  if (a.avgTemp <= b.avgTemp) return -1;
  return 1;
});

/* Scales (manual domain) */

let xScale = d3
  .scaleLinear()
  .domain([0, 30])
  .range([margin, svgWidth - margin]);

let yScale = d3
  .scaleLinear()
  .domain([0, 2000])
  .range([svgHeight - margin, margin]);

let rScale = d3.scaleSqrt().domain([0, 10]).range([4, 15]);

/* Draw X and Y axis lines */
// X-axis
svg
  .append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", svgWidth - margin)
  .attr("y2", svgHeight - margin)
  .attr("stroke", "black");

// Y-axis
svg
  .append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", margin)
  .attr("y2", margin)
  .attr("stroke", "black");

/* X-axis ticks and labels*/
for (let i = 0; i <= 30; i += 5) {
  let x = xScale(i);
  svg
    .append("line")
    .attr("x1", x)
    .attr("y1", svgHeight - margin)
    .attr("x2", x)
    .attr("y2", svgHeight - margin + 5)
    .attr("stroke", "black");

  svg
    .append("text")
    .attr("x", x)
    .attr("y", svgHeight - margin + 20)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .text(i);
}

/* Y-axis ticks and labels */
for (let i = 0; i <= 2000; i += 200) {
  let y = yScale(i);
  svg
    .append("line")
    .attr("x1", margin - 5)
    .attr("y1", y)
    .attr("x2", margin)
    .attr("y2", y)
    .attr("stroke", "black");

  svg
    .append("text")
    .attr("x", margin - 10)
    .attr("y", y + 4)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .text(i);
}
/* Color scale = hot meal % */
let colorScale = d3
  .scaleLinear()
  .domain([30, 100])
  .range(["#60a5fa", "#fbbf24"]);

/*  Draw data points */
for (let i = 0; i < dataset.length; i++) {
  let d = dataset[i];
  svg
    .append("circle")
    .attr("cx", xScale(d.avgTemp))
    .attr("cy", yScale(d.total))
    .attr("r", rScale(d.high - d.low))
    .attr("fill", colorScale(d.hotMealPercent))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("opacity", 0.8);
}

/* Axis labels and title */
svg
  .append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 20)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Average Temperature (°C)");

svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -svgHeight / 2)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Total Calorie Intake (kcal)");

svg
  .append("text")
  .attr("x", svgWidth / 2)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Temperature vs Calorie Intake (Hot Meal %)");

/* Color Legend */
let colorBoxX = svgWidth - 240;
let colorBoxY = svgHeight - 550;
let colorBoxWidth = 160;
let colorBoxHeight = 110;

svg
  .append("rect")
  .attr("x", colorBoxX)
  .attr("y", colorBoxY)
  .attr("width", colorBoxWidth)
  .attr("height", colorBoxHeight)
  .attr("stroke", "black")
  .attr("fill", "none");

svg
  .append("text")
  .attr("x", colorBoxX + 10)
  .attr("y", colorBoxY + 20)
  .style("font-size", "14px")
  .text("Hot Meal Percentage");

svg
  .append("circle")
  .attr("cx", colorBoxX + 25)
  .attr("cy", colorBoxY + 50)
  .attr("r", 10)
  .attr("fill", "#60a5fa");
svg
  .append("text")
  .attr("x", colorBoxX + 45)
  .attr("y", colorBoxY + 55)
  .text("Low (~30%)");

svg
  .append("circle")
  .attr("cx", colorBoxX + 25)
  .attr("cy", colorBoxY + 85)
  .attr("r", 10)
  .attr("fill", "#fbbf24");
svg
  .append("text")
  .attr("x", colorBoxX + 45)
  .attr("y", colorBoxY + 90)
  .text("High (~100%)");

/* Size Legend */
let sizeBoxX = svgWidth - 240;
let sizeBoxY = svgHeight - 350;
let sizeBoxWidth = 160;
let sizeBoxHeight = 120;

svg
  .append("rect")
  .attr("x", sizeBoxX)
  .attr("y", sizeBoxY - 70)
  .attr("width", sizeBoxWidth)
  .attr("height", sizeBoxHeight)
  .attr("stroke", "black")
  .attr("fill", "none");

svg
  .append("text")
  .attr("x", sizeBoxX + 10)
  .attr("y", sizeBoxY - 50)
  .style("font-size", "14px")
  .text("Temperature Range (°C)");

let ranges = [2, 5, 10];
for (let i = 0; i < ranges.length; i++) {
  let value = ranges[i];
  let r = rScale(value);
  svg
    .append("circle")
    .attr("cx", sizeBoxX + 25)
    .attr("cy", sizeBoxY - 30 + i * 25)
    .attr("r", r)
    .attr("fill", "gray")
    .attr("opacity", 0.6)
    .attr("stroke", "black");
  svg
    .append("text")
    .attr("x", sizeBoxX + 45)
    .attr("y", sizeBoxY - 25 + i * 25)
    .style("font-size", "12px")
    .text(value + "°C");
}
