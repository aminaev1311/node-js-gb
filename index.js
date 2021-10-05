const fs = require("fs");
const readline = require("readline");

const IP1 = "89.123.1.41";
const IP2 = "34.48.240.111";

//clears the files if they already exist
const clearFiles = async () => {
  await fs.writeFile(`${IP1}_requests.log`, "", (err) => {
    console.log(`file ${IP1}_requests.log emptied successfuly.`);
    if (err) console.log(err);
  });
  await fs.writeFile(`${IP2}_requests.log`, "", (err) => {
    console.log(`file ${IP2}_requests.log emptied successfuly.`);
    if (err) console.log(err);
  });
};

clearFiles();

let readStream = fs.createReadStream("./access.log");

readStream.on("error", console.log);

const readInterface = readline.createInterface({
  input: readStream,
});

readInterface.on("line", (line) => {
  if (line.includes(IP1)) {
    fs.appendFile(`${IP1}_requests.log`, line + "\n", (err) => {
      if (err) console.log(err);
    });
  }

  if (line.includes(IP2)) {
    fs.appendFile(`${IP2}_requests.log`, line + "\n", (err) => {
      if (err) console.log(err);
    });
  }
});

readInterface.on("error", (err) => {
  console.log(`An error occured during wriging to log file: ${err}`);
});

readInterface.on("close", () =>
  console.log("Job finished. Logs were written successfully!")
);
