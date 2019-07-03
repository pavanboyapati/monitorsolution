const request = require("request");
const { saveData } = require("./handleData");

const pollMagnificent = () => {
  setTimeout(() => {
    request("http://magnificent:12345", function(error, response, body) {
      const data = {};
      if (error) {
        data.statusCode = "error";
        console.log("error:", error); // Print the error if one occurred
      }
      //   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      //   console.log("body:", body); // Print the HTML for the Google homepage.
      data.statusCode = response && response.statusCode;
      data.timestamp = new Date();
      console.log(data);
      saveData(data);
      pollMagnificent();
    });
  }, 15000);
};

module.exports = pollMagnificent;
