//script which uses mongo-cron to loop through previous collections and converts
//into a job-queue
//jobs are represented by the documents stored in a mongoDb collection

//initializes DB connection
import { MongoClient } from "mongodb";

const mongo = await MongoClient.connect("mongodb://localhost:27017");
const db = mongo.db("proposals");

//Initializes and starts the worker
import { MongoCron } from "mongodb-cron";

const collection = db.collection("jobs");
const cron = new MongoCron({
  collection, // a collection where jobs are stored
  onDocument: async doc => console.log(doc), // triggered on job processing
  onError: async err => console.log(err) // triggered on error
});

cron.start(); // start processing

//creates first 'job'
const job = await collection.insert({
  sleepUntil: new Date()
});
