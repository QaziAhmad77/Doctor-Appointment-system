const userModel = require('../models/userModel');
const doctorModel = require('../models/doctoreModel');
const appointmentModel = require('../models/appointmentModel');

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId }); // find one whose id match with this id
    res.status(200).send({
      success: true,
      message: 'doctor data fetch success',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Fetching Doctor Details',
    });
  }
};
const updateProfileController = async (req, res) => {
  try {
    const { userId } = req.body;
    const doctor = await doctorModel.findOneAndUpdate({ userId }, req.body, {
      new: true,
    });
    res.status(201).send({
      success: true,
      message: 'Doctor Profile Updated',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating doctor details',
      error,
    });
  }
};
// const updateProfileController = async (req, res) => {
//   try {
//     const { userId, ...updateData } = req.body;
//     console.log(userId);

//     const doctor = await doctorModel.findOneAndUpdate(
//       { userId: userId }, // Use 'userId' as the query condition
//       updateData, // Use 'updateData' to specify the fields to be updated
//       { new: true } // Set the 'new' option to return the updated document
//     );

//     console.log(doctor);
//     res.status(201).send({
//       success: true,
//       message: 'Doctor Profile Updated',
//       data: doctor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: 'Error while updating doctor details',
//       error,
//     });
//   }
// };
const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: 'Single Doctor Info Fetched',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Single doctor info',
    });
  }
};
const doctorAppointments = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: 'Doctor Appoinments fetch Successfully',
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in DOc Appointments',
    });
  }
};
const updateStatusController = async (req, res) => {
  // doctor will update this
  try {
    const { appointmentsId, status } = req.body; // status = approved
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: 'Status-updated',
      message: `Your appointment has been updated ${status}`,
      onCLickPath: '/doctor-appointments',
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Appointment Status Updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Update Status',
    });
  }
};
module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorById,
  doctorAppointments,
  updateStatusController,
};
