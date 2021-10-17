const { readdirSync, lstatSync, readFileSync } = require("fs");
const http = require("http");
const path = require("path");

// const isFile = (path) => lstatSync(path).isFile();
const isDir = (path) => lstatSync(path).isDirectory();

let pathToCurrentDir = process.cwd();
const baseUrl = "http://localhost:5555/";
let filesInDirectory = null;
let pathToSelected = null;
let result = null;

(async () => {
  http
    .createServer(async (req, res) => {
      pathToSelected = path.join(pathToCurrentDir, req.url.slice(1));
      try {
        if (isDir(pathToSelected)) {
          filesInDirectory = readdirSync(pathToSelected);
          result = `<h1>File Manager</h1><h4><a href=${
            baseUrl + req.url.split("/").slice(1, -1).join("/")
          }>...</a></h4>`;
          filesInDirectory.forEach(
            (fileName) =>
              (result += `<h4><a href=${
                baseUrl + req.url.slice(1) + "/" + fileName
              }>${fileName}</a></h4>`)
          );
          res.setHeader("Content-Type", "text/html");
        } else {
          result = readFileSync(pathToSelected, "utf-8");
          res.setHeader("Content-Type", "text/plain");
        }
      } catch (e) {
        result = e.toString();
        res.setHeader("Content-Type", "text/plain");
      }
      res.end(result);
    })
    .listen(5555, () => {
      console.log("the server started at " + baseUrl);
    });
})();
