import mongoose from "mongoose";

var ProposalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  payment_amount: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  AbsoluteYesCount: {
    type: Number,
    required: true
  },
  YesCount: {
    type: Number,
    required: true
  },
  NoCount: {
    type: Number,
    required: true
  },
  AbstainCount: {
    type: Number,
    required: true
  },
  fCachedEndorsed: {
    type: Boolean,
    require: true
  },
  fCachedFunding: {
    type: Boolean,
    required: true
  },
  passing: {
    type: Boolean,
    required: true
  }
});

var Proposal = mongoose.model("Proposal", ProposalSchema);

export default Proposal;
