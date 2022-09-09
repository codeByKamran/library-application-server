import Student from "../models/studentModal.js";

export const getStudents = async (req, res) => {
  try {
    const found = await Student.find().exec();
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

export const getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await Student.findOne({ slug: id }).exec();
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

export const addStudent = async (req, res) => {
  try {
    const intials = await Student.find().exec();
    const lastItem = intials?.sort((a, b) => a.rollNo - b.rollNo).slice(-1)[0];
    const rollNo = lastItem?.rollNo ? lastItem.rollNo + 1 : intials?.length + 1;
    const added = await Student.create({ ...req.body, rollNo });

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

export const updateStudent = async (req, res) => {
  const id = req.params.id || req.body.id;
  const borrowedBook = req.body?.borrowedBook;

  const found = await Student.findOne({ slug: id }).exec();
  if (!found) {
    res.statusMessage = "Not Found";
    return res.sendStatus(404);
  }

  let dataToUpdate = { ...req.body };
  if (borrowedBook) {
    dataToUpdate = { borrowedBooks: [...found?.borrowedBooks, borrowedBook] };
  }

  try {
    const updated = await Student.findOneAndUpdate({ slug: id }, dataToUpdate, {
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

export const deleteStudent = async (req, res) => {
  const id = req.params.id || req.body.id;

  const found = await Student.findOne({ slug: id }).exec();
  if (!found) {
    res.statusMessage = "Not Found";
    return res.sendStatus(404);
  }

  try {
    const deleted = await Student.deleteOne({ slug: id }).exec();

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
