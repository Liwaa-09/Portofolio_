const inputValue = document.getElementById("user-input");
const historyValue = document.getElementById("history"); // New element to display the history
let firstValue = "";
let secondValue = "";
let currentOperator = "";
let resultDisplayed = false;

// Handling number input
document.querySelectorAll(".numbers").forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (resultDisplayed) {
      // If result has been displayed, start fresh
      inputValue.innerText = ""; // Clear input for new calculation
      historyValue.innerText = ""; // Clear history
      resultDisplayed = false; // Reset result flag
    }
    if (inputValue.innerText === "0" || inputValue.innerText === "NaN") {
      inputValue.innerText = ""; // Clear zero or NaN before appending new number
    }
    inputValue.innerText += e.target.innerHTML.trim(); // Append clicked number
  });
});

// Handling operations
document.querySelectorAll(".operations").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const operator = e.target.innerHTML.trim();

    // Handle "AC" (clear all)
    if (operator === "AC") {
      inputValue.innerText = "0"; // Reset display to 0
      historyValue.innerText = ""; // Clear history
      firstValue = "";
      secondValue = "";
      currentOperator = "";
      return;
    }

    // Handle "DEL" (delete last character)
    if (operator === "DEL") {
      inputValue.innerText = inputValue.innerText.slice(0, -1) || "0"; // Remove last character
      return;
    }

    // If "=" is pressed, calculate the result
    if (operator === "=") {
      secondValue = inputValue.innerText.split(currentOperator)[1]; // Get second value after operator
      const result = calculateResult(firstValue, secondValue, currentOperator); // Calculate result
      
      // Display the full operation in history
      historyValue.innerText = firstValue + " " + currentOperator + " " + secondValue;
      
      // Display only the result in main display
      inputValue.innerText = result;
      
      resultDisplayed = true; // Mark that result is displayed
      return;
    }

    // If an operator is clicked, save the current value and operator
    firstValue = inputValue.innerText; // Save current value
    currentOperator = operator; // Save operator
    inputValue.innerText += " " + currentOperator + " "; // Display operator with current value
  });
});

// Function to perform calculation
function calculateResult(first, second, operator) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    default:
      return second;
  }
}
