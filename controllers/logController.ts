import Log from "../models/logModel";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { User } from "../models/userModel";

export const createLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user || {}; // Get userId from JWT middleware

    if (!userId) {
      throw new CustomError("User authentication required", 401);
    }

    // Get user email from userId
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 401);
    }

    const logData = {
      ...req.body,
      userEmail: user.email, // Use email from user lookup
    };

    await Log.create(logData);
    res.status(201).json({ message: "Log saved" });
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user || {}; // Get userId from JWT middleware

    if (!userId) {
      throw new CustomError("User authentication required", 401);
    }

    // Get user email from userId
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 401);
    }

    // Get query parameters for pagination and filtering
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const type = req.query.type as string; // Optional log type filter

    // Build filter query using the user's email
    const filter: any = { userEmail: user.email };
    if (type) {
      filter.type = type;
    }

    const skip = (page - 1) * limit;

    // Get logs for the authenticated user only
    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Log.countDocuments(filter);

    res.json({
      logs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasMore: skip + logs.length < totalCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user || {}; // Get userId from JWT middleware

    if (!userId) {
      throw new CustomError("User authentication required", 401);
    }

    // Get user email from userId
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 401);
    }

    // Delete only the authenticated user's logs
    const result = await Log.deleteMany({ userEmail: user.email });
    res.json({
      message: "Your logs deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};
