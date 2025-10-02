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

    //I chose the drummer's hat as the origin point because it sits at the very top, and the legs below are separated, making it difficult to determine the exact position.//
    //The origin coordinates of the drummer's hat are (75, 35) //

    let drumx = xInput;
    let drumy = yInput;

    /*hcx is Drummer Head x , hcy is Drummer Head y*/

    let hcx = drumx + 20;
    let hcy = drumy + 20;

    /* Draw a Drummer head*/

    let drummerHead = drawing.append("circle")
        .attr("cx", hcx) // 95 //
        .attr("cy", hcy) // 55 //
        .attr("r", 20)
        .attr("fill", "pink");

    /* Drumer Hat Body*/

    let drummerHatBody = drawing.append("rect")
        .attr("x", drumx) // 75 //
        .attr("y", drumy) // 35 //
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", "blue");

    /* Drummer Hat Brim*/

    let drummerHatBrim = drawing.append("rect")
        .attr("x", hcx + 30) //125//
        .attr("y", hcy - 10) //45//
        .attr("width", 10)
        .attr("height", 5)
        .attr("fill", "#BFC0FF");

    /* Drum*/

    let drum = drawing.append("circle")
        .attr("cx", hcx + 50) //145//
        .attr("cy", hcy + 85) //140//
        .attr("r", 45)
        .attr("fill", "white")
        .attr("stroke", "black");

    /* Drummer Body*/

    let drummerBody = drawing.append("polyline")
        .attr("points", closedPolygon(hcx, hcy + 20, //95,75//
            hcx - 25, hcy + 120, //70,175//
            hcx, hcy + 145, //95,200//
            hcx + 25, hcy + 120, //120,175//
            hcx, hcy + 20)) //95,75//
        .attr("fill", "#737699");

    /* Drummer Left Leg*/

    let drummerleftLeg = drawing.append("line")
        .attr("x1", hcx - 10) //85//
        .attr("x2", hcx - 50) //45//
        .attr("y1", hcy + 135) //190//
        .attr("y2", hcy + 215) //270//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Right Leg*/

    let drummerRightLeg = drawing.append("line")
        .attr("x1", hcx + 10) //105//
        .attr("x2", hcx + 65) //160//
        .attr("y1", hcy + 135) //190//
        .attr("y2", hcy + 195) //250//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Left Foot*/

    let drummerleftFoot = drawing.append("line")
        .attr("x1", hcx - 50) //45//
        .attr("x2", hcx - 35) //60//
        .attr("y1", hcy + 215) //270//
        .attr("y2", hcy + 220) //275//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Right Foot*/

    let drummerRightfoot = drawing.append("line")
        .attr("x1", hcx + 65) //160//
        .attr("x2", hcx + 80) //175//
        .attr("y1", hcy + 195) //250//
        .attr("y2", hcy + 190) //245//
        .attr("stroke", "black")
        .attr("stroke-width", 1);


    if (choice === "drumming") {

        // This is code for the "Drumming" pose//
        /* When "drumming" is selected, the drummer’s arms and drumstick are positioned as if playing.
        When the other option is selected, the arms are lowered and drumstick is at rest.*/

        /* Drumstick*/

        let drumstick = drawing.append("circle")
            .attr("cx", hcx - 70) //25//
            .attr("cy", hcy + 35) //90//
            .attr("r", 10)
            .attr("fill", "black");

        /* Drummer Left Upper Arm*/

        let drummerLeftupperArm = drawing.append("line")
            .attr("x1", hcx - 5) //90//
            .attr("x2", hcx - 50) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 70) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Left Lower Arm*/

        let drummerLeftlowerArm = drawing.append("line")
            .attr("x1", hcx - 65) //30//
            .attr("x2", hcx - 50) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 70) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Right Arm*/

        let drummerRightArm = drawing.append("line")
            .attr("x1", hcx + 5) //100//
            .attr("x2", hcx + 20) //115//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 50) //105//
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    } else {

        //This is code for the "Resting" pose//
        /* Drumstick*/

        let drumstick = drawing.append("circle")
            .attr("cx", hcx - 35) //25//
            .attr("cy", hcy + 130) //90//
            .attr("r", 10)
            .attr("fill", "black");

        /* Drummer Left Upper Arm*/

        let drummerLeftupperArm = drawing.append("line")
            .attr("x1", hcx - 5) //90//
            .attr("x2", hcx - 25) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 95) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Left Lower Arm*/

        let drummerLeftlowerArm = drawing.append("line")
            .attr("x1", hcx - 25) //30//
            .attr("x2", hcx - 35) //45//
            .attr("y1", hcy + 95) //100//
            .attr("y2", hcy + 135) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Right Arm*/

        let drummerRightArm = drawing.append("line")
            .attr("x1", hcx + 5) //100//
            .attr("x2", hcx + 15) //115//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 55) //105//
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    }
    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
