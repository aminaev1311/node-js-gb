const run = () => {
  const { DateTime } = require("luxon");

  const date = process.argv[2];

  let dateArray = [];

  try {
    dateArray = date.split("-");
  } catch {
    console.log(
      "Empty input. Please enter a string in the required format 'mm-hh-dd-mm-yyyy'"
    );
    return;
  }

  let year,
    month,
    day,
    hour,
    minute = null;

  year = +dateArray[dateArray.length - 1];
  month = +dateArray[dateArray.length - 2];
  day = +dateArray[dateArray.length - 3];
  hour = +dateArray[dateArray.length - 4];
  minute = +dateArray[dateArray.length - 5];

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hour) ||
    isNaN(minute)
  ) {
    console.log(
      "Please enter a string in the required format 'mm-hh-dd-mm-yyyy'"
    );
    return;
  }

  const dateObj = {
    year,
    month,
    day,
    hour,
    minute,
  };

  console.log("you entered", { ...dateObj });
  console.log("the time now is " + DateTime.now().toISO());

  let luxonDate = null;
  let secondsLeft = null;

  try {
    luxonDate = DateTime.fromObject(dateObj);

    secondsLeft = Math.floor(
      luxonDate.diff(DateTime.now(), ["seconds"]).values.seconds
    );
  } catch {
    console.log(
      "Error: " +
        luxonDate.invalid.reason +
        "; " +
        luxonDate.invalid.explanation
    );
    return;
  }

  if (secondsLeft < 0) {
    console.log(
      "the time occurs in the past. Please enter a time in the future."
    );
    return;
  }

  let seconds = secondsLeft;

  class EventsHandler {
    static start(seconds) {
      console.log("the timer was started. Seconds left: " + seconds);
    }
    static tick(seconds) {
      console.log("the timer is ticking. Seconds left: " + seconds);
    }

    static end() {
      console.clear();
      console.log("the timer ended! Yohoo");
    }
  }

  const EventEmitter = require("events");

  class MyEmitter extends EventEmitter {}

  const emitter = new MyEmitter();

  emitter.on("start", EventsHandler.start);
  emitter.on("tick", EventsHandler.tick);
  emitter.on("end", EventsHandler.end);

  emitter.emit("start", seconds);

  let timerId = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      if (seconds !== 0) emitter.emit("tick", seconds);
    }
    if (seconds === 0) {
      emitter.emit("end");
      clearInterval(timerId);
    }
  }, 1000);
};

run();
