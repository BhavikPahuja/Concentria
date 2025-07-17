import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  type: { type: String, required: true },
  timestamp: { type: Date, required: true },
  url: { type: String },
  filename: { type: String },
  extra: { type: mongoose.Schema.Types.Mixed }
});

export default mongoose.model("Log", LogSchema);