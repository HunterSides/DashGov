const fetch = require("node-fetch");
const mongoose = require("mongoose");
var _ = require("lodash");

require("dotenv").config();

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

(async () => {
  const dataArr = [];

  function superBlockInsert() {
    var SuperBlock = mongoose.model("SuperBlock", {
      governanceminquorum: { type: Number },
      proposalfee: { type: Number },
      superblockcycle: { type: Number },
      lastsuperblock: { type: Number },
      nextsuperblock: { type: Number },
      currentblock: { type: Number },
      budget: { type: Number }
    });
    SuperBlock.insertMany(dataArr)
      .then(function() {
        console.log(dataArr);
        console.log("Data inserted"); // Success
      })
      .catch(function(error) {
        console.log(error); // Failure
      });
  }

  async function querySuperBlockJSON() {
    const response = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"getgovernanceinfo", "id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });
    const responseTwo = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"getchaintips", "id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });
    const responseThree = await fetch(
      "http://dashrpc:password@127.0.0.1:9998/",
      {
        body:
          '{"method":"getsuperblockbudget","params":[1495440], "id":1,"jsonrpc":"2.0"}',
        headers: { "content-type": "content-type:text/plain" },
        method: "POST"
      }
    );

    const parsedresponse = await response.json();
    const parsedresponseTwo = await responseTwo.json();
    const parsedresponseThree = await responseThree.json();

    const dataresult = parsedresponse.result;
    const dataresultTwo = parsedresponseTwo.result[0].height;
    const dataresultThree = parsedresponseThree.result;

    const currentBlock = { currentblock: dataresultTwo }; //create
    const budget = Math.round((dataresultThree + Number.EPSILON) * 100) / 100;

    const mergedObjects = { ...dataresult, ...currentBlock, budget };
    dataArr.push(mergedObjects);
  }

  await querySuperBlockJSON();

  superBlockInsert();

  return dataArr;
})();
