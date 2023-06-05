const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorById,
} = require('../controllers/doctorController');
const router = express.Router();

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', authMiddleware, getDoctorById);
module.exports = router;
