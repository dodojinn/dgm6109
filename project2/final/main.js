"use strict"

let item1, item2, zip;

document.getElementById("submit").addEventListener("click", processFormValues);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

/* IC: Process your form values here */

function processFormValues() {

    item1 = document.getElementById("item1").value;
    item2 = document.getElementById("item2").value;
    zip = document.getElementById("zip").value;

    processData();
}

/* IC: You do not need to modify or flowchart this function. It just passes things on to the functions that you should modify! */

function processData() {

    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

/* IC: Use this function to check that all form values (that are not limited by HTML) are within accepable ranges. Output an error and return false if not. If you want to divide your validate function into smaller functions, then call the additional functions from this one. */ 

function validateData() {
    let valid = true;

    if (item1 !== "Pizza" && item1 !== "Salad" && item1 !== "Burger" && item1 !== "Fries") {
        output("Please select a valid meal item!");
        valid = false; //Checking if the first item is valid//
    }

    if (item2 !== "Pizza" && item2 !== "Salad" && item2 !== "Burger" && item2 !== "Fries") {
        output("Please select a valid meal item!");
        valid = false; //Checking if the second item is valid//
    }

    if (item1 === item2) {
        output("Please select two different meal items!");
        valid = false; //"The two items cannot be the same."//
    }

    if (zip.length != 5 || isNaN(zip)) {
        output("Please enter a valid 5-digit zip code!");
        valid = false; //ZIP code must be 5 digits and only numbers//
    }

    return valid;
}

/* IC: Use this function to check that all combinations of submitted data meet your project requirements.  Output an error and return false if not. If you want to divide your evaluate function into smaller functions, then call the additional functions from this one. */ 

function evaluateAnswers() {

    if (zip >= "00801" && zip <= "00851") {
        output("Sorry, ordering is not yet available in the Virgin Islands!");
        return false; //Checking if the zip code is in the Virgin Islands//
    }

    let pizza = 4;
    let salad = 3;
    let burger = 5;
    let fries = 2;
    let total = 0;//Prices of each meal item//

    if (item1 === "Pizza") total = total + pizza;
    else if (item1 === "Salad") total = total + salad;
    else if (item1 === "Burger") total = total + burger;
    else if (item1 === "Fries") total = total + fries;// Add price of first item //

    if (item2 === "Pizza") total = total + pizza;
    else if (item2 === "Salad") total = total + salad;
    else if (item2 === "Burger") total = total + burger;
    else if (item2 === "Fries") total = total + fries;// Add price of second item //
    
    if((item1 === "Burger" && item2 === "Fries") || (item1 === "Fries" && item2 === "Burger")){
        total = total * 0.75; // 25% discount for Burger & Fries combo //
    }

    /*
    I used this method to round numbers to 2 decimal places.
    I learned it from an online coding tutorial (MDN Web Docs).
    Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    */
    
    let cents = total * 100;// Multiply total by 100 to move the decimal point two places to the right //
    cents = Math.round(cents);// Round to the nearest whole number //
    total = cents / 100; // Round to two decimal places //

    let message = "Your " + item1 + " & " + item2 + " combo will be delivered to your address in ZIP code " + zip + " . "+" Your total is $" + total + ".";
    // Complete the message //
    
    if ((item1 === "Burger" && item2 === "Fries") || (item1 === "Fries" && item2 === "Burger")) {
    message = message + " You get a 25% discount for ordering the Burger & Fries combo!";
    }

    output(message);// Output the final message //
    return true;
}
