import express from "express";
import mongoose from "mongoose";

import SuperBlock from "../models/superblock.js";

const router = express.Router();

export const getSuperBlocks = async (req, res) => {
  try {
    const superblock = await SuperBlock.find();

    res.status(200).json(superblock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSuperBlock = async (req, res) => {
  const { id } = req.params;

  try {
    const superblock = await SuperBlock.findById(id);

    res.status(200).json(superblock);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
