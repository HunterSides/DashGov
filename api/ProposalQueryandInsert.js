//repsonsible for querying the dashnode and sending data to your database

/* list of curl commands  
  
   (superblock data)  curl --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getgovernanceinfo"}' -H 'content-type:text/plain;' http://dashrpc:password@127.0.0.1:9998/ 
   (superblock budget) curl --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getsuperblockbudget","params":[1478824]}' -H 'content-type:text/plain;' http://dashrpc:password@127.0.0.1:9998/
   (governance data)  curl --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"gobject","params":["list","all","proposals"]}' -H 'content-type:text/plain;' http://dashrpc:password@127.0.0.1:9998/ 
*/

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

  function proposalInsert() {
    // Proposal model
    var Proposal = mongoose.model("Proposal", {
      name: { type: String, unique: true },
      payment_amount: { type: Number },
      url: { type: String },
      AbsoluteYesCount: { type: Number },
      YesCount: { type: Number },
      NoCount: { type: Number },
      AbstainCount: { type: Number },
      fCachedFunding: { type: Boolean }
    });

    // Function call
    Proposal.insertMany(dataArr)
      .then(function() {
        console.log(dataArr);
        console.log("Data inserted"); // Success
      })
      .catch(function(error) {
        console.log(error); // Failure
      });
  }

  async function queryProposalsJSON() {
    const response = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body:
        '{"method":"gobject","params":["list","all","proposals"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });

    const parsedresponse = await response.json();

    const dataresult = parsedresponse.result;
    return dataresult;
  }

  await queryProposalsJSON()
    .then(async dataresult => {
      const fetchProposals = async () => {
        return new Promise(resolve => resolve({ result: dataresult })).then(
          rsp => {
            return _.chain(rsp.result)
              .mapValues(p => {
                p.data = JSON.parse(p.DataString);
                return p;
              })
              .values()
              .value();
          }
        );
      };
      const proposals = await fetchProposals();
      return proposals;
    })
    .then(proposals => {
      proposals.forEach(p => {
        obj = _.zipObject(
          [
            "name",
            "payment_amount",
            "url",
            "AbsoluteYesCount",
            "YesCount",
            "NoCount",
            "AbstainCount",
            "fCachedFunding"
          ],
          [
            p.data.name,
            p.data.payment_amount,
            p.data.url,
            p.AbsoluteYesCount,
            p.YesCount,
            p.NoCount,
            p.AbstainCount,
            p.fCachedFunding
          ]
        );
        dataArr.push(obj);
      });
      //return p
    });

  proposalInsert();

  return dataArr;
})();
