alert("Please, First of all go through the Instructions , given below .");
let openBtn = document.getElementById("open-btn");
let modalContainer = document.getElementById("modal-container");
let closeBtn = document.getElementById("close-btn");

openBtn.addEventListener("click", function () {
  modalContainer.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modalContainer.style.display = "none";
});
window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandTextElement = previousOperandElement;
    this.currentOperandTextElement = currentOperandElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }
    if (operation === "!" || operation === "log" || operation === "ln") {
      this.operation = operation;
      this.previousOperand = this.currentOperand;

      this.updateDisplay();
      this.compute();
      this.updateDisplay();
    } else {
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
  }
  compute() {
    let computation;

    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "%":
        computation = prev % curr;
        break;
      case "^":
        computation = Math.pow(prev, curr);
        break;
      case "!":
        computation = fact(prev);
        break;
      case "log":
        computation = Math.log10(prev);
        break;
      case "ln":
        computation = Math.log(prev);
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    const floatNumber = parseFloat(number);

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

    if (isNaN(floatNumber)) return "";

    return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

function fact(number) {
  let f = 1;
  for (let i = 1; i <= number; i++) {
    f = f * i;
  }
  return f;
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-allclear]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
