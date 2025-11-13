"use strict";

/* SVG setup */
let svgWidth = 800;
let svgHeight = 600;
let margin = 70;

let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Border */
svg.append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Dataset */
let dataset = [
  { emotionalImpact: 1, mealsPerDay: 2, highTemp: 20, hotMealPercent: 33 },
  { emotionalImpact: 1, mealsPerDay: 2, highTemp: 22, hotMealPercent: 75 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 20, hotMealPercent: 80 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 16, hotMealPercent: 90 },
  { emotionalImpact: 4, mealsPerDay: 3, highTemp: 16, hotMealPercent: 100 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 17, hotMealPercent: 100 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 18, hotMealPercent: 80 },
  { emotionalImpact: 4, mealsPerDay: 2, highTemp: 16, hotMealPercent: 90 },
  { emotionalImpact: 4, mealsPerDay: 3, highTemp: 19, hotMealPercent: 90 },
  { emotionalImpact: 3, mealsPerDay: 2, highTemp: 15, hotMealPercent: 50 },
  { emotionalImpact: 4, mealsPerDay: 2, highTemp: 16, hotMealPercent: 85 },
  { emotionalImpact: 3, mealsPerDay: 2, highTemp: 16, hotMealPercent: 80 },
  { emotionalImpact: 1, mealsPerDay: 3, highTemp: 16, hotMealPercent: 100 },
  { emotionalImpact: 1, mealsPerDay: 3, highTemp: 18, hotMealPercent: 67 },
  { emotionalImpact: 3, mealsPerDay: 1, highTemp: 18, hotMealPercent: 80 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 17, hotMealPercent: 90 },
  { emotionalImpact: 2, mealsPerDay: 2, highTemp: 14, hotMealPercent: 67 },
  { emotionalImpact: 3, mealsPerDay: 3, highTemp: 15, hotMealPercent: 67 },
  { emotionalImpact: 4, mealsPerDay: 2, highTemp: 12, hotMealPercent: 100 },
  { emotionalImpact: 4, mealsPerDay: 3, highTemp: 12, hotMealPercent: 100 }
];

/* === Array.filter requirement === */
/* Keep only days with mealsPerDay >= 2 */
function atLeastTwoMeals(d) {
  return d.mealsPerDay >= 2;
}
let filteredData = dataset.filter(atLeastTwoMeals);

/* === Array.sort (so smaller circles on top) === */
filteredData.sort(function (a, b) {
  return b.hotMealPercent - a.hotMealPercent;
});

/* Scales */
let xScale = d3.scaleLinear().domain([0, 5]).range([margin, svgWidth - margin]);
let yScale = d3.scaleLinear().domain([0, 4]).range([svgHeight - margin, margin]);

/* New improved color palette (soft blue → warm yellow → red) */
let colorScale = d3.scaleLinear()
  .domain([10, 16, 22])
  .range(["#93c5fd", "#fcd34d", "#f87171"]);

/* Circle size = hot meal ratio */
let rScale = d3.scaleSqrt().domain([0, 100]).range([4, 18]);

/* Axes */
// X-axis
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", svgWidth - margin)
  .attr("y2", svgHeight - margin)
  .attr("stroke", "black");

// Y-axis
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", margin)
  .attr("y2", margin)
  .attr("stroke", "black");

/* X ticks */
for (let i = 0; i <= 5; i++) {
  let x = xScale(i);
  svg.append("line")
    .attr("x1", x)
    .attr("y1", svgHeight - margin)
    .attr("x2", x)
    .attr("y2", svgHeight - margin + 5)
    .attr("stroke", "black");

  svg.append("text")
    .attr("x", x)
    .attr("y", svgHeight - margin + 20)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(i);
}

/* Y ticks */
for (let i = 0; i <= 4; i++) {
  let y = yScale(i);
  svg.append("line")
    .attr("x1", margin - 5)
    .attr("y1", y)
    .attr("x2", margin)
    .attr("y2", y)
    .attr("stroke", "black");

  svg.append("text")
    .attr("x", margin - 10)
    .attr("y", y + 4)
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .text(i);
}

/* Draw circles */
for (let i = 0; i < filteredData.length; i++) {
  let d = filteredData[i];
  svg.append("circle")
    .attr("cx", xScale(d.emotionalImpact))
    .attr("cy", yScale(d.mealsPerDay))
    .attr("r", rScale(d.hotMealPercent))
    .attr("fill", colorScale(d.highTemp))
    .attr("stroke", "black")
    .attr("opacity", 0.85);
}

/* Labels */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 20)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Emotional Impact (0–5)");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -svgHeight / 2)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Meals per Day (0–4)");

svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Emotional Impact vs. Meals per Day");


/* Legends (boxed) */

/* Color legend (Temperature) */
let colorBoxX = svgWidth - 200;
let colorBoxY = svgHeight - 240;
let colorBoxW = 170;
let colorBoxH = 145;

svg
  .append("rect")
  .attr("x", colorBoxX)
  .attr("y", colorBoxY)
  .attr("width", colorBoxW)
  .attr("height", colorBoxH)
  .attr("stroke", "black")
  .attr("fill", "none");

svg
  .append("text")
  .attr("x", colorBoxX + 10)
  .attr("y", colorBoxY + 20)
  .style("font-size", "14px")
  .text("High Temperature (°C)");

svg
  .append("circle")
  .attr("cx", colorBoxX + 25)
  .attr("cy", colorBoxY + 50)
  .attr("r", 10)
  .attr("fill", "#3b82f6");
svg
  .append("text")
  .attr("x", colorBoxX + 45)
  .attr("y", colorBoxY + 55)
  .text("Cool (~10)");

svg
  .append("circle")
  .attr("cx", colorBoxX + 25)
  .attr("cy", colorBoxY + 85)
  .attr("r", 10)
  .attr("fill", "#facc15");
svg
  .append("text")
  .attr("x", colorBoxX + 45)
  .attr("y", colorBoxY + 90)
  .text("Mild (~16)");

svg
  .append("circle")
  .attr("cx", colorBoxX + 25)
  .attr("cy", colorBoxY + 120)
  .attr("r", 10)
  .attr("fill", "#ef4444");
svg
  .append("text")
  .attr("x", colorBoxX + 45)
  .attr("y", colorBoxY + 125)
  .text("Hot (~22)");

/* Size legend (Hot Meal %) */
let sizeBoxX = svgWidth - 400;
let sizeBoxY = svgHeight - 150;
let sizeBoxW = 170;
let sizeBoxH = 120;

svg
  .append("rect")
  .attr("x", sizeBoxX)
  .attr("y", sizeBoxY - 70)
  .attr("width", sizeBoxW)
  .attr("height", sizeBoxH)
  .attr("stroke", "black")
  .attr("fill", "none");

svg
  .append("text")
  .attr("x", sizeBoxX + 10)
  .attr("y", sizeBoxY - 50)
  .style("font-size", "14px")
  .text("Hot Meal Percentage");

let samplePercents = [20, 60, 100];
for (let i = 0; i < samplePercents.length; i++) {
  let v = samplePercents[i];
  svg
    .append("circle")
    .attr("cx", sizeBoxX + 25)
    .attr("cy", sizeBoxY - 30 + i * 28)
    .attr("r", rScale(v))
    .attr("fill", "gray")
    .attr("opacity", 0.6)
    .attr("stroke", "black");
  svg
    .append("text")
    .attr("x", sizeBoxX + 45)
    .attr("y", sizeBoxY - 25 + i * 28)
    .style("font-size", "12px")
    .text(v + "%");
}
