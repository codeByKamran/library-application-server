import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    class: { type: String },
    rollNo: { type: Number, required: true },
    slug: { type: String, required: true },
    borrowedBooks: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
