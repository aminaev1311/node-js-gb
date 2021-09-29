const EventEmitter = require("events");
const { emit } = require("process");

const requestTypes = [
  {
    type: "send",
    payload: "to send a document",
  },
  {
    type: "receive",
    payload: "to receive a document",
  },
  {
    type: "sign",
    payload: "to sign a document",
  },
  {
    type: "pay",
    payload: "to pay",
  },
];

class Customer {
  constructor(params) {
    this.type = params.type;
    this.payload = params.payload;
  }
}

const generateIntInRange = (min, max) => {
  const minNumber = Math.floor(min);
  const maxNumber = Math.ceil(max);
  const number =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return number;
};

//resolves a promise after a timeout of ms millisecons
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

//generate a customer with a random delay from 1 to 5 seconds and a random request
const generateRandomCustomer = () => {
  //generating a random request
  const request = requestTypes[generateIntInRange(0, 2)];
  //generating a random customer with a random delay in ms
  const timeDelay = generateIntInRange(0, 5) * 1000;

  const customer = delay(timeDelay).then(() => new Customer(request));

  return customer;
};

class Handler {
  static send(payload) {
    console.log("send request");
    console.log(`The customer needs ${payload}`);
  }

  static receive(payload) {
    console.log("receive request");
    console.log(`The customer needs ${payload}`);
  }

  static sign(payload) {
    console.log("sign request");
    console.log(`The customer needs ${payload}`);
  }

  static pay(payload) {
    console.log("pay request");
    console.log(`The customer needs to pay ${payload}`);
  }
}

// class MyEmitter extends EventEmitter {}
const emitter = new EventEmitter();

// requestTypes.forEach((request) =>
//   emitter.on(request.type, eval(`Handler.${request.type}`))
// );
emitter.on("send", Handler.send);
emitter.on("receive", Handler.receive);
emitter.on("sign", Handler.sign);
emitter.once("pay", Handler.pay);

const run = async () => {
  const customer = await generateRandomCustomer();
  emitter.emit(customer.type, customer.payload);
  emitter.emit("pay", customer.payload);
  run();
};

run();
