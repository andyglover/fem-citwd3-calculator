console.log("Hello world");
const myConsole = document.querySelector(".console");
const numBtns = document.querySelectorAll(".numberBtn");
const operationBtns = document.querySelectorAll(".operationBtn");
const screen = document.querySelector(".screen");
const clearBtn = document.querySelector(".c");
const backBtn = document.querySelector(".b");
const equalsBtn = document.querySelector(".e");
let waitingForNextInput = false;
let waitingAfterEquals = false;
let storedOperation;
let storedValue;
let previousValue;

fillConsole();

for (let i = 0; i < numBtns.length; i++) {
  numBtns[i].addEventListener("click", () => {
    if (waitingAfterEquals) {
      storedValue = null;
      previousValue = null;
      storedOperation = null;
      screen.textContent = numBtns[i].textContent;
      waitingAfterEquals = false;
    } else if (waitingForNextInput) {
      screen.textContent = numBtns[i].textContent;
      waitingForNextInput = false;
    } else if (screen.textContent === "hello, world!") {
      screen.textContent = numBtns[i].textContent;
    } else if (screen.textContent === "0" || 0) {
      screen.textContent = numBtns[i].textContent;
    } else {
      screen.textContent += numBtns[i].textContent;
    }
    fillConsole();
  });
}

for (let i = 0; i < operationBtns.length; i++) {
  operationBtns[i].addEventListener("click", () => {
    if (waitingAfterEquals) {
      waitingAfterEquals = false;
      storedValue = screen.textContent;
      storedOperation = operationBtns[i].textContent;
      waitingForNextInput = true;
    } else if (screen.textContent === "hello, world!") {
      console.log("hello world");
    } else if (storedValue && !waitingForNextInput) {
      storedValue = operate(storedValue, storedOperation, screen.textContent);
      screen.textContent = storedValue;
      storedOperation = operationBtns[i].textContent;
      waitingForNextInput = true;
    } else {
      //TODO highlight the button
      storedValue = screen.textContent;
      storedOperation = operationBtns[i].textContent;
      waitingForNextInput = true;
    }
    fillConsole();
  });
}

clearBtn.addEventListener("click", () => {
  screen.textContent = "0";
  storedValue = null;
  storedOperation = null;
  previousValue = null;
  waitingForNextInput = false;
  waitingAfterEquals = false;
  fillConsole();
});
backBtn.addEventListener("click", () => {
  if (screen.textContent === "hello, world!") {
    screen.textContent = "0";
  } else if (screen.textContent === "0" || 0) {
    screen.textContent = "0";
  } else if (screen.textContent.slice(0, -1) === "") {
    screen.textContent = "0";
  } else {
    screen.textContent = screen.textContent.slice(0, -1);
  }
  fillConsole();
});

equalsBtn.addEventListener("click", () => {
  if (waitingAfterEquals) {
    console.log("a");
    storedValue = operate(storedValue, storedOperation, previousValue);
    screen.textContent = storedValue;
  } else if (storedValue && !waitingForNextInput) {
    console.log("b");
    previousValue = screen.textContent;
    storedValue = operate(storedValue, storedOperation, screen.textContent);
    screen.textContent = storedValue;
  } else if (storedValue && waitingForNextInput) {
    console.log("c");
    previousValue = storedValue;
    storedValue = operate(storedValue, storedOperation, storedValue);
    screen.textContent = storedValue;
  } else {
    console.log("unexpected outcome of equals press");
  }
  waitingAfterEquals = true;
  fillConsole();
});

function fillConsole() {
  myConsole.setAttribute("style", "white-space: pre;");
  myConsole.textContent = `
  storedValue=${storedValue}, 
  storedOperation=${storedOperation},
  waitingForNextInput=${waitingForNextInput}, 
  screen.textContent=${screen.textContent}, 
  previousValue=${previousValue}
  `;
}

function operate(firstValue, operator, secondValue) {
  firstValue = Number(firstValue);
  secondValue = Number(secondValue);

  if (operator === "÷") {
    return firstValue / secondValue;
  } else if (operator === "×") {
    return firstValue * secondValue;
  } else if (operator === "-") {
    return firstValue - secondValue;
  } else if (operator === "+") {
    return firstValue + secondValue;
  } else {
    console.log("unexpected operation");
  }
}
