import express from "express";
import { getMasterNodes, getMasterNode } from "../controllers/masternodes.js";

const router = express.Router();

router.get("/", getMasterNodes);
router.get("/:id", getMasterNode);

export default router;
