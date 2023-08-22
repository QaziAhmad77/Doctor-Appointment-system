const userModel = require('../models/userModel');
const doctorModel = require('../models/doctoreModel');
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await userModel.findOne({
      email: email,
    });
    if (userFound) {
      return res
        .status(200)
        .send({ message: 'User Already Exist', success: false });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new userModel({
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
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(200)
        .send({ message: 'user not found', success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: 'Invalid Email or Password', success: false });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res
      .status(200)
      .send({ message: 'Login Successfully', success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in login Controller ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById({ _id: userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: 'user not found',
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'auth error', success: false, error });
  }
};
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: 'apply-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onclickPath: '/admin/doctors',
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: 'Doctor Account Applied Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while APplying For Doctore',
    });
  }
};
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: 'all notification marked as read',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error in notification',
      success: false,
      error,
    });
  }
};
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: 'Notification Deleted successfully',
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'unable to delete all notifications',
      error,
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'Doctors Lists Fetched Successfully',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while fecthing doctors',
      error,
    });
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    req.body.status = 'pending';
    const newAppointment = await new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: 'New-appointment-request',
      message: ` new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: '/user/appointments',
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Appoinment Book successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Booking Appointment',
    });
  }
};
const bookingAvailability = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm')
      .subtract(1, 'hours')
      .toISOString();
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
    const doctorId = req.body.doctorId;
    const appointmensts = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointmensts.length > 0) {
      return res.status(200).send({
        message: 'Application not Available at this time',
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Appointment available',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Booking',
    });
  }
};
const userAppointmentsController = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({
      userId,
    });
    res.status(200).send({
      success: true,
      message: 'Users Appointments Fetch Successfully',
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error In User Appointments',
    });
  }
};
module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailability,
  userAppointmentsController,
};
