import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true }, // 👈 new field
  },
  { collection: "projects" }
);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
