"use strict"

// Fahrenheit to Celsius and Kelvin conversion//
document.getElementById("submit")
    .addEventListener("click", function () {

        let fahrenheit = document.getElementById("inputF").value;

        let conversionType = document.getElementById("conversionChoice").value;

        let celsius = (fahrenheit - 32) * 5 / 9;
        let kelvin = celsius + 273.15;

        output("Temperature (Fahrenheit): " + fahrenheit);

        // if/else //

        /*if (conversionType === "c"){
            output("Temperature(Celsius):"+celsius);
        }else{
            output("Temperature(Kelvin):"+kelvin);
        }
        */

        // Two if //

        if (conversionType === "c") {
            output("Temperature (Celsius):" + celsius);
        }
        if (conversionType === "k") {
            output("Temperature (Kelvin):" + kelvin);
        }

        /*I prefer the coding style with two if statements.
         To me, it feels more intuitive and easier to grasp.
         While it may be a bit longer, it makes conditional comparisons 
         much simpler for beginners.*/

    });