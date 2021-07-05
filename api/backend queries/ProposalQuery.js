const fetch = require("node-fetch");
const mongoose = require("mongoose");
var _ = require("lodash");

/******** need to add Abstain votes and requested amount (payment amount) and update all routes including front end ********/

(async () => {
  const dataArr = [];

  async function queryProposalsJSON() {
    const response = await fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body:
        '{"method":"gobject","params":["list","all","proposals"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST"
    });

    const parsedresponse = await response.json(); //parses JSONRPC string into JSON object

    const dataresult = parsedresponse.result; //uses . notation to access first layer of object (result)
    return dataresult; //all parsed data to be manipulated
  }

  await queryProposalsJSON()
    .then(async dataresult => {
      const fetchProposals = async () => {
        return new Promise(resolve => resolve({ result: dataresult })) //sets result(property) = dataresult(parameter)
          .then(rsp => {
            return _.chain(rsp.result)
              .mapValues(p => {
                p.data = JSON.parse(p.DataString);
                return p;
              })
              .values() // turns mapvalues into array of values
              .value(); // closes lodash _.chain
          });
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

  //proposalInsert();
  console.log(dataArr);
  return dataArr;
})();
