const display = document.getElementById("display");
const operators = ["*", "+", "-", "/", "%"];
function append(value) {
  const lastElement = display.innerText[display.innerText.length - 1];
  if (
    (lastElement === "." && value === ".") ||
    (operators.includes(lastElement) && operators.includes(value))
  )
    return;
  if (display.innerText === "0" && value !== ".") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = "Error";
  }
}
