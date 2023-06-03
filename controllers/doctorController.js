const userModel = require('../models/userModel');
const doctorModel = require('../models/doctoreModel');

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating doctor details',
      error,
    });
  }
};
module.exports = {
  getDoctorInfoController,
  updateProfileController,
};
