const express = require('express');
const {
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
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/getUserData', authMiddleware, authController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.post(
  '/get-all-notification',
  authMiddleware,
  getAllNotificationController
);
router.post(
  '/delete-all-notification',
  authMiddleware,
  deleteAllNotificationController
);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
// BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);
// Booking Availability
router.post('booking-availability', authMiddleware, bookingAvailability);
// Appointment
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
