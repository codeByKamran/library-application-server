import Book from "../models/bookModal.js";
import mongoose from "mongoose";

export const getBooks = async (req, res) => {
  try {
    const found = await Book.find().exec();
    if (!found) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getManyBooks = async (req, res) => {
  const ids = req.body.ids;
  try {
    const result = await Book.find({
      _id: { $in: ids },
    });

    if (!result) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ result });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await Book.findOne({ slug: id }).exec();
    if (!found) {
      res.statusMessage = "Data Found";
      return res.sendStatus(204);
    }

    res.status(200).json({ message: `Found`, found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const addBook = async (req, res) => {
  try {
    const added = await Book.create(req.body);

    if (!added) {
      res.statusMessage = "Unable to post";
      return res.sendStatus(500);
    }
    res.statusMessage = "Added successfully";
    res.status(201).json({ added });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const updateBook = async (req, res) => {
  const id = req.params.id || req.body.id;

  try {
    const updated = await Book.findOneAndUpdate({ slug: id }, req.body, {
      new: true,
    }).exec();

    if (!updated) {
      res.statusMessage = "Not Found";
      return res.sendStatus(404);
    }
    res.statusMessage = "Updated";
    res.status(201).json({ updated });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id || req.body.id;
  const found = await Book.findOne({ slug: id }).exec();
  if (!found) {
    res.statusMessage = "Not Found";
    return res.sendStatus(404);
  }

  try {
    const deleted = await Book.deleteOne({ slug: id }).exec();

    if (!deleted) {
      res.statusMessage = "Unable to delete";
      return res.sendStatus(500);
    }
    res.statusMessage = "Deleted";
    res.status(200).json({ deleted });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};
