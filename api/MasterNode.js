const fetch = require("node-fetch");
const mongoose = require("mongoose");
var _ = require("lodash");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

(async () => {
  const dataArr = [];

  function masterNodeInsert() {
    var MasterNode = mongoose.model("MasterNode", {
      total: { type: Number },
      enabled: { type: Number }
    });
    MasterNode.insertMany(dataArr)
      .then(function() {
        console.log(dataArr);
        console.log("Data inserted"); // Success
      })
      .catch(function(error) {
        console.log(error); // Failure
      });
  }

  async function queryMasterNodeJSON() {
    const response = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"masternode","params":["count"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });
    const parsedresponse = await response.json();
    const dataresult = parsedresponse.result;
    dataArr.push(dataresult);
  }

  await queryMasterNodeJSON();

  masterNodeInsert();

  return dataArr;
})();
