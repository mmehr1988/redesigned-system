const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

// GET TO RENDER DASHBOARD PAGE
router.route('/').get(dashboardController.getDashboardPage);
// GET TO RETRIEVE CHART DATA
router.route('/workoutdata').get(dashboardController.getDashboardData);

module.exports = router;
