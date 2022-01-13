//repsonsible for querying the dashnode and sending data to your database
//future iterations to include using the queried proposal hash key as a unique ID when upserting data
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
var _ = require("lodash");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

(async () => {
  const Proposal = mongoose.model("Proposal", {
    Hash: { type: String, unique: true },
    name: { type: String, unique: true },
    payment_amount: { type: Number },
    url: { type: String },
    AbsoluteYesCount: { type: Number },
    YesCount: { type: Number },
    NoCount: { type: Number },
    AbstainCount: { type: Number },
    fCachedEndorsed: { type: Boolean },
    fCachedFunding: { type: Boolean },
    passing: { type: Boolean },
    title: { type: String },
  });
  const dataArr = [];
  const passingThreshold = [];
  const processedHashValues = [];
  function calcPassing() {
    dataArr.forEach((v) => {
      v.passing = v.AbsoluteYesCount > passingThreshold[0].passingThreshold;
    });
  }
  async function proposalUpdate() {
    //this function to be used in future iterations to dynamically update proposal data in mongoDB using the proposals Hash value as a unique ID
    dataArr.forEach((v) => {
      Proposal.updateMany(
        { Hash: { $in: processedHashValues } },
        {
          $set: {
            AbsoluteYesCount: v.AbsoluteYesCount,
            YesCount: v.YesCount,
            NoCount: v.NoCount,
            AbstainCount: v.AbstainCount,
            fCachedEndorsed: v.fCachedEndorsed,
            fCachedFunding: v.fCachedFunding,
            passing: v.passing,
          },
        }
      );
      console.log(v.passing);
    });
  }

  function proposalInsert() {
    Proposal.insertMany(dataArr)
      .then(function () {
        console.log("Proposal data inserted");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function scrapeSite() {
    console.log("Scraping sites.. one moment please.");
    await Promise.all(
      dataArr.map(async (v) => {
        await axios(`https://www.dashcentral.org/p/${v.name}`).then(
          async (response) => {
            const html = await response.data;
            const $ = cheerio.load(html);
            const description = $('meta[property="og:description"]').attr(
              "content"
            );
            v.title = description;
          }
        );
      })
    );
    console.log("Sites successfully scraped");
  }

  async function queryProposalsJSON() {
    const response = fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"gobject","params":["list","all","proposals"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST",
    });

    const responseTwo = fetch("http://dashrpc:password@127.0.0.1:9998/", {
      body: '{"method":"masternode","params":["count"],"id":1,"jsonrpc":"2.0"}',
      headers: { "content-type": "content-type:text/plain" },
      method: "POST",
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
    .then(async (dataresult) => {
      const fetchProposals = async () => {
        return new Promise((resolve) => resolve({ result: dataresult })).then(
          (rsp) => {
            return _.chain(rsp.result)
              .mapValues((p) => {
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
    .then((proposals) => {
      proposals.forEach((p) => {
        obj = _.zipObject(
          [
            "Hash",
            "name",
            "payment_amount",
            "url",
            "AbsoluteYesCount",
            "YesCount",
            "NoCount",
            "AbstainCount",
            "fCachedEndorsed",
            "fCachedFunding",
          ],
          [
            p.Hash,
            p.data.name,
            p.data.payment_amount,
            p.data.url,
            p.AbsoluteYesCount,
            p.YesCount,
            p.NoCount,
            p.AbstainCount,
            p.fCachedEndorsed,
            p.fCachedFunding,
          ]
        );
        dataArr.push(obj);
      });
    });

  await scrapeSite();
  calcPassing();
  proposalInsert();
  return dataArr;
})();
