function main() {
    // Get user input values from the form //
    const item1 = document.getElementById("item1").value;
    const item2 = document.getElementById("item2").value;
    const zip = document.getElementById("zip").value;

    if (validateData(item1, item2, zip)) {// Only continue if all data is valid//
        evaluateAnswers(item1, item2, zip);
    }
}

function validateData(item1, item2, zip) {// Function to validate user inputs //
    const validItems = ["Pizza", "Salad", "Burger", "Fries"];// list of vaild menu items//


    if (!validItems.includes(item1)) {// check if first item is valid//
        output("Please select a valid first item.");
        return false;
    }

    if (!validItems.includes(item2)) { // check if second item is valid//
        output("Please select a valid second item.");
        return false;
    }

    if (item1 === item2) {// Check id both items are not the same//
        output("The two items cannot be the same.");
        return false;
    }

    if (!/^\d{5}$/.test(zip)) {// Check if ZIP code is 5 digits //
        output("Please enter a valid 5 digit ZIP code.");
        return false;
    }

    return true; // All checks passed//
}

function evaluateAnswers(item1, item2, zip) { // Function to evaluate order//

    if (zip >= "00801" && zip <= "00851") {// Check if ZIP is in Virgin Islands range//
        output("Unfortunately, ordering is not yet available in the Virgin Islands.");
        return;
    }

    const prices = { Pizza: 4, Salad: 3, Burger: 5, Fries: 2 };// Set item prices//
    let total = prices[item1] + prices[item2];// calculate total price//

    let message = `Your ${item1} & ${item2} combo will be delivered to ZIP ${zip}. `;

    if (
        (item1 === "Burger" && item2 === "Fries") ||// check for Burger and Fries combo//
        (item1 === "Fries" && item2 === "Burger")
    ) {
        total *= 0.75;// apply 25% discount //
        message += `The total price will be $${total.toFixed(2)}. This includes a 25% discount.`;// add discount message //
    } else {
        message += `The total price will be $${total.toFixed(2)}.`;// add regular price message //
    }

    output(message);
}

function output(msg) {
    document.getElementById("output").innerText = msg;//show message on the web//
}
