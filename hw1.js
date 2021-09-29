const colors = require("colors");

const num1 = +process.argv[2];
const num2 = +process.argv[3];

//check if the inputs are numbers, if not display and error and return
if (isNaN(num1) || isNaN(num2)) {
  console.log("error. both inputs should be numbers!".red);
  if (isNaN(num1)) {
    console.log("first input is not a number".red);
  }
  if (isNaN(num2)) {
    console.log("second input is not a number".red);
  }
  return;
}

const isPrime = (number) => {
  if (number === 2 || number === 3) return true;
  if (number === 1 || number % 2 === 0 || number % 3 === 0) return false;
  for (let i = number - 1; i >= 4; i--) {
    if (number % i === 0) return false;
  }
  return true;
};

const getPrimaryArray = (num1, num2) => {
  let primaryArray = [];
  const temp = 0;

  //to ensure that num2 is always bigger than num1
  if (num1 > num2) {
    temp = num1;
    num1 = num2;
    num2 = temp;
  }

  for (let index = num1; index <= num2; index++) {
    if (isPrime(index)) primaryArray.push(index);
  }

  return primaryArray;
};

let array = getPrimaryArray(num1, num2);

if (array.length === 0) {
  console.log("no prime numbers found".red);
  return;
}

const consoleColoredOutput = (array) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index].toString();
    if ((index + 1) % 3 === 1) {
      console.log(element.green);
    }
    if ((index + 1) % 3 === 2) {
      console.log(element.yellow);
    }
    if ((index + 1) % 3 === 0) {
      console.log(element.red);
    }
  }
};

consoleColoredOutput(array);
