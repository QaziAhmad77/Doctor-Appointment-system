const doctorModel = require('../models/doctoreModel');
const userModel = require('../models/userModel');

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}); // find all user
    res.status(200).send({
      success: true,
      message: 'user data',
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while fetching users',
      error,
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}); // find all doctor
    res.status(200).send({
      success: true,
      message: 'doctor data',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while fetching doctors data',
      error,
    });
  }
};
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body; // status = approved
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }); // approve
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      // send notification to doctor
      type: 'doctor-account-request-updated',
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: '/notification',
    });
    user.isDoctor = status === 'approved' ? true : false; // change isDoctor to true
    await user.save();
    res.status(201).send({
      success: true,
      message: 'Account Status Updated',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Account Status',
      error,
    });
  }
};
module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
};
