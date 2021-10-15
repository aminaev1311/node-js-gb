const http = require("http");
const url = require("url");
const os = require("os");
const cluster = require("cluster");

const cpus = os.cpus();
// console.log(cpus);
// console.log(cluster.isMaster);
// console.log(cluster.isWorker);
// console.log(process);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (cpu of cpus) {
    // console.log(cpu);
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} started`);
}

// const server = http.createServer((req, res) => {
// console.log("request url: ", req.url);
// console.log("request method: ", req.method);
// console.log("request headers: ", req.headers);
// console.log(res.statusCode);
// res.setHeader("nathan", "some bullshit");
// res.writeHead(200, "ok", {
//   "custom-header": "yahoo",
// });
// res.write("<h3>hi from Nathan!</h3>");
// res.end();
// if (req.url === "/user") {
//   res.writeHead(200, "Yeah baby", {
//     "user-url": "rocks",
//   });
//   res.write("user page");
//   res.end();
// } else {
//   res.writeHead(404, "Page not found", {
//     "user-url": "not found",
//   });
//   res.write("user not found");
//   res.end();
// }
// if (req.method === "GET") {
//   res.writeHead(200, "Yeah baby", {
//     "user-url": "rocks",
//   });
//   res.write("get requests are allowed");
//   res.end();
// } else {
//   res.writeHead(405, "Method not allowed", {
//     "user-url": "405",
//   });
//   res.write(`method ${req.method} is not allowed`);
//   res.end();
// }
// const { query } = url.parse(req.url, true);
// res.setHeader("Content-Type", "application/json");
// const parsedQuery = JSON.stringify(query);
// res.write(parsedQuery);
// res.end();
// if (req.method === "POST") {
//   let data = "";
//   req.on("data", (chunk) => (data += chunk));
//   req.on("end", () => {
//     const parsedData = JSON.parse(data);
//     console.log("parsed data", parsedData);
//     console.log("data", data);
//     res.setHeader("Content-Type", "application/json");
//     res.write(data);
//     res.end();
//   });
// } else res.end();
// });
// server.listen("5555");
