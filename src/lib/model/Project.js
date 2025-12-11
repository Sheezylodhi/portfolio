import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    images: { type: [String], default: [] }, // multiple images
  },
  { collection: "projects" }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
