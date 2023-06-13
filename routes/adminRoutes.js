const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  deleteTable,
  deleteSpecificUser
} = require('../controllers/adminController');
const router = express.Router();

router.get('/getAllUsers', authMiddleware, getAllUsersController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
router.post(
  '/changeAccountStatus',
  authMiddleware,
  changeAccountStatusController
);
// router.delete('/delete-table', deleteTable);
// router.delete("/delete-specific-user",deleteSpecificUser);
module.exports = router;
