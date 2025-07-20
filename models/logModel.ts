import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true }, // Added for user-specific logs
    type: { type: String, required: true },
    timestamp: { type: Date, required: true },
    url: { type: String },
    filename: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create compound index for efficient querying
LogSchema.index({ userEmail: 1, timestamp: -1 });

export default mongoose.model("Log", LogSchema);
