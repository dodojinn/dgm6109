"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {

    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);

    choice = document.getElementById("choice").value;

    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

let showOrigin = true; // Set to true to show the origin point

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

function drawImage() {

    drummer(drawing,xInput,yInput,showOrigin,choice);
    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
