/*-------------------------------- Constants --------------------------------*/

// Constants would store unchanging values, but this app doesn't need any for now.

/*-------------------------------- Variables --------------------------------*/

let shouldResetDisplay = false; // Variable to determine if the display should be reset
let firstNumber = ""; // Variable to store the first number
let operator = ""; // Variable to store the operator
let secondNumber = ""; // Variable to store the second number

/*------------------------ Cached Element References ------------------------*/

const display = document.querySelector(".display"); // Selects the display area element
const numberButtons = document.querySelectorAll(".number"); // Selects all elements with the class of number (0-9)
const operatorButtons = document.querySelectorAll(".operator"); // Selects all elements with the class of operator (+, -, *, /, C)
const equalsButton = document.querySelector(".equals"); // Selects the equals button
const clearButton = document.querySelector(".clear"); // Selects the clear "C" button

/*----------------------------- Event Listeners -----------------------------*/

// Add event listeners to all number buttons
// When a number button is clicked, its text (the number) is passed to appendNumber
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

// Add event listeners to all operator buttons
// When an operator button (+, -, *, /) is clicked, its text (the operator) is passed to setOperator
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

// Add event listener to the equals button
// When the equals button is clicked, the evaluate function is called
equalsButton.addEventListener("click", evaluate);

// Add event listener to the clear button
// When the clear button is clicked, the clear function is called and the display is reset
clearButton.addEventListener("click", clear);

/*-------------------------------- Functions --------------------------------*/

function appendNumber(number) {
  if (shouldResetDisplay) resetDisplay(); // If the display should be reset, call the resetDisplay function
  display.textContent = display.textContent === "0" ? number : display.textContent + number; // If the display is 0, replace it with the number. Otherwise, append the number
}

function resetDisplay() {
  // Function to reset the display for fresh input
  display.textContent = ""; // Clears the display
  shouldResetDisplay = false; // This ensures that the screen won't reset again until a new number is clicked
}

function setOperator(selectedOperator) {
  // Function to set the operator for the calculation
  if (operator) evaluate(); // If an operator already exists, calculate the current result
  firstNumber = display.textContent; // Store the current display value as the first number
  operator = selectedOperator; // Store the selected operator as the operator
  display.textContent = `${firstNumber} ${operator}`; // Update the display to show the first number and operator in progress
  shouldResetDisplay = true; // Prepare the display for the second number
}

function evaluate() {
  // Function to calculate the result
  if (!operator || shouldResetDisplay) return; // If there is no operator or the display should be reset, stop the function

  if (operator === "/" && display.textContent === "0") {
    // If the operator is division and the second number is 0, display error
    alert("You can't divide by 0."); // Display an alert
    clear(); // Clear the display
    return; // Stops the function from running to prevent further errors
  }

  secondNumber = display.textContent.split(" ")[2] || display.textContent; // Store the second number as the current display value
  const result = calculate(firstNumber, operator, secondNumber); // Calculate the result and display it
  display.textContent = `${result}`; // Show result only on the display
  firstNumber = result.toString(); // Store the result as the first number for the next calculation
  operator = ""; // Reset the operator for the next calculation
  shouldResetDisplay = true; // Prepare the display for the next calculation
}

function calculate(a, operator, b) {
  // Function to calculate the acutal math based on the operator
  a = parseFloat(a); // Convert the first number from a string to a number
  b = parseFloat(b); // Convert the second number from a string to a number
  // This ensures that the numbers are treated as numbers and not strings

  switch (
    operator // Switch statement to determine which operator to use
  ) {
    case "+": // If the operator is addition
      return a + b; // Return the sum of the two numbers
    case "-": // If the operator is subtraction
      return a - b; // Return the difference of the two numbers
    case "*": // If the operator is multiplication
      return a * b; // Return the multiplication of the two numbers
    case "/": // If the operator is division
      return a / b; // Return the division of the two numbers

    default: // If the operator is not one of the above
      return null; // Return nothing
  }
}

function clear() {
  // Fully reset the display and clear all variables
  display.textContent = "0"; // Reset the display to "0"
  firstNumber = ""; // Reset the first number
  secondNumber = ""; // Reset the second number
  operator = ""; // Reset the operator
  shouldResetDisplay = false; // Ensure that the display won't reset again until a new number is clicked
}
