import express from "express";
import { createLog, deleteLogs, getLogs } from "../controllers/logController";

const router = express.Router();

router.post("/logs", createLog);
router.get("/logs", getLogs);
router.delete("/logs", deleteLogs);

export default router;