const express = require('express');
const htmlController = require('../controllers/htmlController');

const router = express.Router();

// COVER PAGE
router.route('/').get(htmlController.getCoverPage);

// HOME PAGE
router.route('/home').get(htmlController.getHomePage);

// CREATE ONE WORKOUT
router.route('/create-one-workout').post(htmlController.createOneWorkout);

// RENDER CREATE PAGE
router.route('/create/:id?').get(htmlController.getCreatePage);

// ADD EXERCISE
router.route('/addexercise/:id').patch(htmlController.addExercise);

// GET WORKOUTS OVERVIEW PAGE (for ALL historical workouts)
router.route('/workouts').get(htmlController.getHistoricalView);

// GET WORKOUT EXERCISE OVER PAGE (for ONE historical workouts)
router.route('/workouts/:id').get(htmlController.getHistoricalOne);

// DELETE WORKOUT
router.route('/workouts/:id').delete(htmlController.deleteHistoricalOne);

// DELETE EXERCISE
router
  .route('/exercise-delete/:exId/:wktId')
  .delete(htmlController.deleteHistoricalExercise);

module.exports = router;
