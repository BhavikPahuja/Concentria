import Log from "../models/logModel";
import { Request, Response, NextFunction } from "express";

export const createLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const log = req.body;
    await Log.create(log);
    res.status(201).json({ message: "Log saved" });
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json( logs );
  } catch (err) {
    next(err);
  }
};

export const deleteLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Log.deleteMany({});
    res.json({ message: 'All logs deleted', deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};