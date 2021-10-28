import mongoose from "mongoose";

var MasterNodeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  total: {
    type: Number,
    required: true
  },
  enabled: {
    type: Number,
    required: true
  }
});

var MasterNode = mongoose.model("MasterNode", MasterNodeSchema);

export default MasterNode;
