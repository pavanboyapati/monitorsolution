const http = require("http");
const { getData } = require("./src/handleData");
const pollMagnificent = require("./src/poll");

const requestHandler = (request, response) => {
  //set CORS heahers
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  const { url } = request;
  if (url == "/api/monitor") {
    response.end(JSON.stringify(getData()));
  }

  response.end("Welcome to monitor API. Try '/api/monitor'");
};

const port = process.env.PORT || 5000;
const server = http.createServer(requestHandler);
server.listen(port, err => {
  if (err) console.log("something bad happened", err);
  console.log(`server is listening on ${port}`);
  pollMagnificent();
});
