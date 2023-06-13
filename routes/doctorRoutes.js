const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorById,
  doctorAppointments,
  updateStatusController,
} = require('../controllers/doctorController');
const router = express.Router();
//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);
//POST UPDATE DOC INFO
router.post('/getDoctorById', authMiddleware, getDoctorById);
//GET APPOINTMENTS
router.get('/doctor-appointments', authMiddleware, doctorAppointments);
//POST update Status
router.post('/update-status', authMiddleware, updateStatusController);


module.exports = router;
