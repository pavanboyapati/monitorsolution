const fs = require("fs");

const saveData = data => {
  fs.readFile("/usr/app/monitor-api/data.json", (error, obj) => {
    if (error) console.log("error reading while pushing data " + error);
    let existingData = obj ? JSON.parse(obj) : [];
    existingData.splice(0, 0, data);
    fs.writeFile(
      "/usr/app/monitor-api/data.json",
      JSON.stringify(existingData),
      error => {
        if (error) console.log("Error while writing " + error);
      }
    );
  });
};

const getData = (interval = "5") => {
  try {
    if (require.cache["/usr/app/monitor-api/data.json"]) {
      delete require.cache["/usr/app/monitor-api/data.json"];
    }
    const data = require("/usr/app/monitor-api/data.json");
    // console.log(data);
    let result = [];
    if (interval == "5") {
      for (let d of data) {
        const now = new Date();
        const diffInMillis = now.getTime() - new Date(d.timestamp).getTime();
        const period = 5 * 60 * 1000;
        if (diffInMillis > period) {
          break;
        }
        // console.log("get data" + d);
        result.push(d);
      }
      return result;
    } else {
      return data;
    }
  } catch (e) {
    console.log("error " + e);
    return [];
  }
};
module.exports = { saveData, getData };
