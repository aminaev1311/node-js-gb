#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const readline = require("readline");
const inquirer = require("inquirer");

const options = yargs.usage("Usage: -p <path>").option("p", {
  alias: "path",
  describe: "Path to directory",
  type: "string",
  demandOption: true,
}).argv;

// const filePath = path.join(__dirname, options.path);

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let data = "";

// rl.question("Enter path to file: ", (answer) => {
//   console.log(answer);

//   const filePath = path.join(__dirname, answer);

//   fs.readFile(filePath, "utf-8", (err, fileData) => {
//     if (err) throw err;
//     console.log(fileData);

//     rl.close();
//   });
// });

// const filePath = path.join(__dirname, data);

// rl.on("close", function () {
//   process.exit(0);
// });

// const directory = process.cwd();
let directory = options.path;

// const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const run = () => {
  // const list = fs.readdirSync(directory).filter(isFile);
  let list = null;
  try {
    list = fs.readdirSync(directory);
  } catch (e) {
    console.log("An error ocurred: ", e);
  }

  try {
    inquirer
      .prompt([
        {
          name: "fileName",
          type: "list",
          message: "choose a file",
          choices: list,
        },
      ])
      .then(async (answer) => {
        console.log(answer.fileName);

        const filePath = path.join(directory, answer.fileName);

        if (fs.lstatSync(filePath).isFile()) {
          //TO-DO: read file line by line with readline stream, search for a pattern with includes/filter
          // fs.readFile(filePath, "utf-8", (err, data) => {
          //   if (err) console.log(err);
          //   console.log(data);
          // });

          const rl_pattern = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          const question = (query) =>
            new Promise((resolve) => rl_pattern.question(query, resolve));

          let answer = null;

          rl_pattern.on("close", function () {
            process.exit(0);
          });

          answer = await question("Please enter a pattern to match: ");

          const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            // output: process.stdout,
          });

          let line = null;
          rl.on("line", (newLine) => {
            line = newLine;
            if (newLine.includes(answer)) {
              console.log(`${answer} pattern found in the line below`);
            }
            console.log(newLine);
          });
          rl.on("close", function () {
            process.exit(0);
          });

          // rl_pattern.question("Enter a pattern to match", (myAnswer) => {
          //   answer = myAnswer;
          //   console.log("Your pattern is", myAnswer);
          //   rl_pattern.close();
          // });
        } else {
          directory = filePath;
          run();
        }
      });
  } catch (e) {
    console.log("An error occured: ", e);
  }
};

run();
