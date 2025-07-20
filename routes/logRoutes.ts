import express from "express";
import { createLog, deleteLogs, getLogs } from "../controllers/logController";
import { verifyAccessToken } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { createLogSchema } from "../validators/logValidator";

const router = express.Router();

// All log routes require authentication
router.post(
  "/logs",
  verifyAccessToken,
  validateRequest(createLogSchema),
  createLog
);
router.get("/logs", verifyAccessToken, getLogs);
router.delete("/logs", verifyAccessToken, deleteLogs);

export default router;
