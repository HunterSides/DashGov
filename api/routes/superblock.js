import express from "express";
import { getSuperBlocks, getSuperBlock } from "../controllers/superblock.js";

const router = express.Router();

router.get("/", getSuperBlocks);
router.get("/:id", getSuperBlock);

export default router;
