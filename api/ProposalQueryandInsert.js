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
  const passingThreshold = [];
  function calcPassing() {
    dataArr.forEach(v => {
      v.passing = v.AbsoluteYesCount > passingThreshold[0].passingThreshold;
    });
  }

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
      fCachedEndorsed: { type: Boolean },
      fCachedFunding: { type: Boolean },
      passing: { type: Boolean }
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

    const responseTwo = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"masternode","params":["count"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });

    const parsedresponse = await response.json();
    const parsedresponseTwo = await responseTwo.json();

    const dataresult = parsedresponse.result;
    const dataresultTwo = parsedresponseTwo.result;

    const calcPassingThreshold = dataresultTwo.enabled / 10;
    const threshold = { passingThreshold: calcPassingThreshold };
    passingThreshold.push(threshold);

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
            "fCachedEndorsed",
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
            p.fCachedEndorsed,
            p.fCachedFunding
          ]
        );
        dataArr.push(obj);
      });
      //return p
    });

  calcPassing();
  proposalInsert();

  return dataArr;
})();
