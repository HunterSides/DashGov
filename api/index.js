import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dontenv from "dotenv";
import proposalRoutes from "./routes/proposals.js";
import superBlockRoutes from "./routes/superblock.js";

const app = express();
dontenv.config();

//app.set("view engine", "ejs");

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); //cors must be called before routes app.use routes

app.use("/proposals", proposalRoutes);
app.use("/superblocks", superBlockRoutes);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running on port:${PORT}`,
        "\n",
        "Connection to DB successful"
      )
    )
  )
  .catch(error => console.log(error.message));

mongoose.set("useFindAndModify", false);
