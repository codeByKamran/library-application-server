import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String, required: true },
    isBorrowed: { type: Boolean, default: false },
    borrowedBy: { type: String },
    student: { type: Object, default: null },
    borrowedOn: { type: Date },
    returnDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
