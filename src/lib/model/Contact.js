import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
    {
    collection: "contacts", // 👈 tumhari collection ka exact naam
  }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
