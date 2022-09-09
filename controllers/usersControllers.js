import User from "../models/auth/userModal.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) {
      res.statusMessage = "No Users Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Users Found";
    res.status(200).json({ users });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id).exec();
    if (!foundUser)
      return res
        .status(204)
        .json({ message: `:( User not Found with ID: ${id}` });

    res.status(200).json({ message: `User Found with ID: ${id}`, foundUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id || req.body.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updatedUser)
      return res.status(404).json({ message: `User Not Found with ID: ${id}` });
    res.status(201).json({ message: "User Updated", updatedUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id || req.body.id;

  const foundUser = await User.findById(id).exec();
  if (!foundUser)
    return res
      .status(204)
      .json({ message: `:( User not Found with ID: ${id}` });

  try {
    const deletedUser = await User.deleteOne({ _id: id }).exec();

    if (!deletedUser)
      return res
        .status(500)
        .json({ message: `Unable to delete user with ID: ${id}` });

    res.status(200).json({ message: "User Deleted Successfully", deletedUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};
