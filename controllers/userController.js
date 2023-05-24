const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await userModel
      .findOne({
        email: email,
      })
      .exec();
    if (userFound) {
      return res
        .status(200)
        .send({ message: 'User Already Exist', success: false });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: 'Register Successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
const registerController = () => {};

module.exports = {
  loginController,
  registerController,
};
