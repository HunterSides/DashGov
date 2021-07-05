const fetch = require("node-fetch");
const { exec, spawn } = require("child_process");
var _ = require("lodash");

(async () => {
  const dataArr = [];
  const sortableFunding = [];

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
    const responseFour = await fetch(
      "http://dashrpc:password@127.0.0.1:9998/",
      {
        body:
          '{"method":"gobject","params":["list","funding","proposals"],"id":1,"jsonrpc":"2.0"}',
        headers: { "content-type": "content-type:text/plain" },
        method: "POST"
      }
    );

    const parsedresponse = await response.json();
    const parsedresponseTwo = await responseTwo.json();
    const parsedresponseThree = await responseThree.json();
    const parsedresponseFour = await responseFour.json();

    const dataresult = parsedresponse.result;
    const dataresultTwo = parsedresponseTwo.result[0].height;
    const dataresultThree = parsedresponseThree.result;
    const dataresultFour = parsedresponseFour.result;

    const allocatedFunds = dataresultFour;
    const currentBlock = { currentblock: dataresultTwo }; //create
    const budget = Math.round((dataresultThree + Number.EPSILON) * 100) / 100;

    const mergedObjects = {
      ...dataresult,
      ...currentBlock,
      budget
    };

    dataArr.push(mergedObjects);
    console.log(dataArr);
    return dataresultFour;
  }
  await querySuperBlockJSON()
    .then(async dataresultFour => {
      const fetchProposals = async () => {
        return new Promise(resolve => resolve({ result: dataresultFour })) //sets result(property) = dataresult(parameter)
          .then(rsp => {
            return _.chain(rsp.result)
              .mapValues(p => {
                p.data = JSON.parse(p.DataString);
                return p;
              })
              .orderBy("AbsoluteYesCount", "desc")
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
          ["name", "payment_amount", "AbsoluteYesCount"],
          [p.data.name, p.data.payment_amount, p.AbsoluteYesCount]
        );
        sortableFunding.push(obj);
      });
      return obj;
    });

  console.log(dataArr);
  return dataArr;
})();
