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

module.exports = router;
