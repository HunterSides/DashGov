import express from "express";
import mongoose from "mongoose";

import MasterNode from "../models/masternode.js";

const router = express.Router();

export const getMasterNodes = async (req, res) => {
  try {
    const masternode = await MasterNode.find();

    res.status(200).json(masternode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMasterNode = async (req, res) => {
  const { id } = req.params;

  try {
    const masternode = await MasterNode.findById(id);

    res.status(200).json(masternode);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
