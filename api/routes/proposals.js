import express from "express";
import {
  getProposals,
  getProposal,
  createProposal,
  updateProposal,
  deleteProposal
} from "../controllers/proposals.js";

const router = express.Router();

router.get("/", getProposals);
router.post("/", createProposal);
router.get("/:id", getProposal);
router.patch("/:id", updateProposal);
router.delete("/:id", deleteProposal);

export default router;
