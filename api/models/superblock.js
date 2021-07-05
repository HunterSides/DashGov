import mongoose from "mongoose";

var SuperBlockSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  governanceminquorum: { type: Number, required: true },
  proposalfee: { type: Number, required: true },
  superblockcycle: { type: Number, required: true },
  lastsuperblock: { type: Number, required: true },
  nextsuperblock: { type: Number, required: true },
  currentblock: { type: Number, require: true },
  budget: { type: Number, require: true }
});

var SuperBlock = mongoose.model("SuperBlock", SuperBlockSchema);

export default SuperBlock;
