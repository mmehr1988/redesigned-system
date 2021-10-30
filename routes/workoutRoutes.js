const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

// API ROUTES
router
  .route('/')
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout);

router
  .route('/:id')
  .get(workoutController.getWorkout)
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

module.exports = router;
