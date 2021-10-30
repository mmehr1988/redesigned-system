const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

// NEW
router.route('/').get(dashboardController.getDashboardPage);
router.route('/workoutdata').get(dashboardController.getDashboardData);

module.exports = router;
