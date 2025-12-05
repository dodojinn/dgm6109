"use strict";

/*
 * Term Project – Bubble Scatter of Temperature vs. Calorie Intake
 * - X-axis：Average Temp (°C)
 * - Y-axis：Total Calorie Intake (kcal)
 * - Circle Size：Meals per Day
 * - Color Intensity：Emotional Impact (0–5)
 */

/* --- SVG Size and Margins --- */

let svgWidth = 900;
let svgHeight = 650;

let margin = {
  top: 60,
  right: 80,
  bottom: 80,
  left: 100,
};

let innerWidth = svgWidth - margin.left - margin.right;
let innerHeight = svgHeight - margin.top - margin.bottom;

/* --- Create SVG and Main Drawing Area --- */

let svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

svg
  .append("rect")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("fill", "none")
  .attr("stroke", "black");

let plotGroup = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* --- Global Variables: Data, Scales, Axis Groups --- */

let data,
  xScale, // Average Temperature -> X Position
  yScale, // Total Calories -> Y Position
  rScale, // Meals per Day -> Circle Radius
  colorScale, // Emotional Impact -> Color
  xAxisGroup,
  yAxisGroup;

/* --- Load JSON Data --- */
(async function () {
  data = await d3.json("data.json").then(buildVisualization);
  console.log("data loaded", data);
})();

/*
 * function buildVisualization(data)
 * Summary: Main control function, responsible for organizing data, creating scales, and calling drawing functions.
 */
function buildVisualization(data) {
  let renderData = organizeData(data);
  buildScales(renderData);
  drawVisualization(renderData);
  return data;
}

/*
 function organizeData(data)
 Summary:
   Clean and organize raw data, keeping only the attributes needed for plotting,
   converting numeric fields to Number, and sorting by avgTemp in ascending order.
 */
function organizeData(data) {
  let cleaned = data.map(function (d) {
    let high = Number(d.highTemp);
    let low = Number(d.lowTemp);

    return {
      date: d.date,
      highTemp: high,
      lowTemp: low,
      avgTemp: (high + low) / 2, // Average Temperature//
      totalCalories: Number(d.totalCalories),
      mealsPerDay: Number(d.mealsPerDay), // Meals per Day//
      hotMealPercent: Number(d.percentHotMeals), // Not currently visualized, but kept for future use//
      emotion: Number(d.emotionalImpact),
      weather: d.weather,
    };
  });

  // Sort by average temperature from lowest to highest //
  cleaned.sort(function (a, b) {
    return a.avgTemp - b.avgTemp;
  });

  console.log("cleaned data:", cleaned);
  return cleaned;
}

/*
  function buildScales(data)
  Summary:
    Create x, y, r, and color scales, and draw axes and titles.
 */
function buildScales(data) {
  // axes start "close to the minimum data value" so points fill the canvas

  let xMin = d3.min(data, function (d) {
    return d.avgTemp;
  });
  let xMax = d3.max(data, function (d) {
    return d.avgTemp;
  });

  // Give a little padding so points don't stick to the edge
  let xPadding = 1;

  xScale = d3
    .scaleLinear()
    .domain([xMin - xPadding, xMax + xPadding])
    .range([0, innerWidth]);

  let yMin = d3.min(data, function (d) {
    return d.totalCalories;
  });
  let yMax = d3.max(data, function (d) {
    return d.totalCalories;
  });

  let yPadding = 100;

  yScale = d3
    .scaleLinear()
    .domain([yMin - yPadding, yMax + yPadding])
    .range([innerHeight, 0]);

  // Circle radius: Meals per Day 
  let minMeals = d3.min(data, function (d) {
    return d.mealsPerDay;
  });
  let maxMeals = d3.max(data, function (d) {
    return d.mealsPerDay;
  });

  rScale = d3.scaleLinear().domain([minMeals, maxMeals]).range([10, 20]);

  // Emotional Impact (0–5 -> color from light to dark)
  colorScale = d3.scaleLinear().domain([0, 5]).range(["#fee0d2", "#de2d26"]);

  // Axes
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  xAxisGroup = plotGroup
    .append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(xAxis);

  yAxisGroup = plotGroup.append("g").call(yAxis);

  // X Axis Label
  plotGroup
    .append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Average Temperature (°C)");

  // Y Axis Label
  plotGroup
    .append("text")
    .attr("x", -innerHeight / 2)
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Total Calorie Intake (kcal)");

  // Overall Title
  svg
    .append("text")
    .attr("x", svgWidth / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("How temperature relates to my daily calorie intake");
}

/*
  function drawVisualization(data)
  Summary:
    Draw all bubbles on the already set up axes,
    and add a legend on the right explaining the meaning of bubble size and color.
 */
function drawVisualization(data) {
  // Draw bubbles
  let bubbles = plotGroup.selectAll("circle").data(data);

bubbles.enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.avgTemp); })
    .attr("cy", function (d) { return yScale(d.totalCalories); })
    .attr("r", function (d) { return rScale(d.mealsPerDay); })
    .attr("fill", function (d) { return colorScale(d.emotion); })
    .attr("stroke", "black")
    .attr("opacity", 0.75);

  // ---------- Legend (placed on the right, slightly above center) ----------

  // Position of the top-right corner of the legend within plotGroup
  let legendX = innerWidth - 110; 
  let legendY = 10;

  let legendGroup = plotGroup
    .append("g")
    .attr("transform", "translate(" + legendX + "," + legendY + ")");

    // legend background (white + border)//
legendGroup.append("rect")
    .attr("x", -10)         
    .attr("y", -20)         
    .attr("width", 195)     
    .attr("height", 250)    
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  /* --- Bubble size legend: Meals per Day --- */

  legendGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 5)
    .attr("font-size", "12px")
    .text("Bubble size = meals per day");

  // --- 2 meals ---
  legendGroup
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 30)
    .attr("r", rScale(2)) 
    .attr("fill", "#cccccc")
    .attr("stroke", "black");

  legendGroup
    .append("text")
    .attr("x", 45)
    .attr("y", 34)
    .attr("font-size", "12px")
    .text("2 meal(s)");

  // --- 3 meals --- //
  legendGroup
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 70)
    .attr("r", rScale(3)) 
    .attr("fill", "#cccccc")
    .attr("stroke", "black");

  legendGroup
    .append("text")
    .attr("x", 45)
    .attr("y", 74)
    .attr("font-size", "12px")
    .text("3 meal(s)");

/* --- Color legend: Emotional impact 1–5 --- */

let colorLegendStartY = 110;

legendGroup.append("text")
    .attr("x", 0)
    .attr("y", colorLegendStartY)
    .attr("font-size", "12px")
    .text("Circle color = emotional impact (1–5)");

// 1 //
legendGroup.append("rect")
    .attr("x", 10)
    .attr("y", colorLegendStartY + 10)
    .attr("width", 20)
    .attr("height", 12)
    .attr("fill", colorScale(1))
    .attr("stroke", "black");

legendGroup.append("text")
    .attr("x", 40)
    .attr("y", colorLegendStartY + 20)
    .attr("font-size", "12px")
    .text("1");

// 2 //
legendGroup.append("rect")
    .attr("x", 10)
    .attr("y", colorLegendStartY + 28)
    .attr("width", 20)
    .attr("height", 12)
    .attr("fill", colorScale(2))
    .attr("stroke", "black");

legendGroup.append("text")
    .attr("x", 40)
    .attr("y", colorLegendStartY + 38)
    .attr("font-size", "12px")
    .text("2");

// 3 //
legendGroup.append("rect")
    .attr("x", 10)
    .attr("y", colorLegendStartY + 46)
    .attr("width", 20)
    .attr("height", 12)
    .attr("fill", colorScale(3))
    .attr("stroke", "black");

legendGroup.append("text")
    .attr("x", 40)
    .attr("y", colorLegendStartY + 56)
    .attr("font-size", "12px")
    .text("3");

// 4 //
legendGroup.append("rect")
    .attr("x", 10)
    .attr("y", colorLegendStartY + 64)
    .attr("width", 20)
    .attr("height", 12)
    .attr("fill", colorScale(4))
    .attr("stroke", "black");

legendGroup.append("text")
    .attr("x", 40)
    .attr("y", colorLegendStartY + 74)
    .attr("font-size", "12px")
    .text("4");

// 5 //
legendGroup.append("rect")
    .attr("x", 10)
    .attr("y", colorLegendStartY + 82)
    .attr("width", 20)
    .attr("height", 12)
    .attr("fill", colorScale(5))
    .attr("stroke", "black");

legendGroup.append("text")
    .attr("x", 40)
    .attr("y", colorLegendStartY + 92)
    .attr("font-size", "12px")
    .text("5");
  }

