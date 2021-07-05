import express from "express";
import mongoose from "mongoose";

import Proposal from "../models/proposal.js";

const router = express.Router();

export const getProposals = async (req, res) => {
  try {
    const proposal = await Proposal.find();

    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProposal = async (req, res) => {
  const { id } = req.params;

  try {
    const proposal = await Proposal.findById(id);

    res.status(200).json(proposal);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProposal = async (req, res) => {
  const {
    name,
    payment_amount,
    url,
    AbsoluteYesCount,
    YesCount,
    NoCount,
    AbstainCount,
    fCachedFunding
  } = req.body;

  const newProposal = new Proposal({
    name,
    payment_amount,
    url,
    AbsoluteYesCount,
    YesCount,
    NoCount,
    AbstainCount,
    fCachedFunding
  });

  try {
    await newProposal.save();

    res.status(201).json(newProposal);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProposal = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    payment_amount,
    url,
    AbsoluteYesCount,
    YesCount,
    NoCount,
    AbstainCount,
    fCachedFunding
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No proposal with id: ${id}`);

  const updatedProposal = {
    name,
    payment_amount,
    url,
    AbsoluteYesCount,
    YesCount,
    NoCount,
    AbstainCount,
    fCachedFunding,
    _id: id
  };

  await ProposalMessage.findByIdAndUpdate(id, updatedProposal, { new: true });

  res.json(updatedProposal);
};

export const deleteProposal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No proposal with id: ${id}`);

  await Proposal.findByIdAndRemove(id);

  res.json({ message: "Proposal deleted successfully." });
};

export default router;
