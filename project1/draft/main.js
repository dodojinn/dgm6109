"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

let drumx = 75;
let drumy = 35;

let hcx= drumx + 20;
let hcy= drumy + 20;

/* Draw a Drummer head*/

let DrummerHead = drawing.append("circle")
    .attr("cx",hcx) // 95 //
    .attr("cy",hcy) // 55 //
    .attr("r",20)
    .attr("fill","pink");

/* Drumer Hat Body*/

let DrummerHatBody = drawing.append("rect")
    .attr("x",drumx) // 75 //
    .attr("y",drumy) // 35 //
    .attr("width",50)
    .attr("height",15)
    .attr("fill","blue");

/* Drummer Hat Brim*/

let DrummerHatBrim = drawing.append("rect")
    .attr("x",hcx+30) //125//
    .attr("y",hcy-10) //45//
    .attr("width",10)
    .attr("height",5)
    .attr("fill","#BFC0FF");

/* Drum*/

let Drum = drawing.append("circle")
    .attr("cx",hcx+50) //145//
    .attr("cy",hcy+85) //140//
    .attr("r",45)
    .attr("fill","white")
    .attr("stroke","black");

/* Drummer Body*/

let DrummerBody = drawing.append("polyline")
    .attr("points",closedPolygon(hcx,hcy+20, //95,75//
                                hcx-25,hcy+120, //70,175//
                                hcx,hcy+145, //95,200//
                                hcx+25,hcy+120, //120,175//
                                hcx,hcy+20)) //95,75//
    .attr("fill","#737699");

/* Drumstick*/

let Drumstick = drawing.append("circle")
    .attr("cx",hcx-70) //25//
    .attr("cy",hcy+35) //90//
    .attr("r",10) 
    .attr("fill","black");

/* Drummer Left Upper Arm*/

let DrummerLeftupperArm = drawing.append("line")
    .attr("x1",hcx-5) //90//
    .attr("x2",hcx-50) //45//
    .attr("y1",hcy+45) //100//
    .attr("y2",hcy+70) //125//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Left Lower Arm*/

let DrummerLeftlowerArm = drawing.append("line")
    .attr("x1",hcx-65) //30//
    .attr("x2",hcx-50) //45//
    .attr("y1",hcy+45) //100//
    .attr("y2",hcy+70) //125//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Right Arm*/

let DrummerRightArm = drawing.append("line")
    .attr("x1",hcx+5) //100//
    .attr("x2",hcx+20) //115//
    .attr("y1",hcy+45) //100//
    .attr("y2",hcy+50) //105//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Left Leg*/

let DrummerleftLeg = drawing.append("line")
    .attr("x1",hcx-10) //85//
    .attr("x2",hcx-50) //45//
    .attr("y1",hcy+135) //190//
    .attr("y2",hcy+215) //270//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Right Leg*/

let DrummerRightLeg = drawing.append("line")
    .attr("x1",hcx+10) //105//
    .attr("x2",hcx+65) //160//
    .attr("y1",hcy+135) //190//
    .attr("y2",hcy+195) //250//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Left Foot*/

let DrummerleftFoot = drawing.append("line")
    .attr("x1",hcx-50) //45//
    .attr("x2",hcx-35) //60//
    .attr("y1",hcy+215) //270//
    .attr("y2",hcy+220) //275//
    .attr("stroke","black")
    .attr("stroke-width",1);

/* Drummer Right Foot*/

let DrummerRightfoot = drawing.append("line")
    .attr("x1",hcx+65) //160//
    .attr("x2",hcx+80) //175//
    .attr("y1",hcy+195) //250//
    .attr("y2",hcy+190) //245//
    .attr("stroke","black")
    .attr("stroke-width",1);

   