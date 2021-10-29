const express = require('express');
const htmlController = require('../controllers/htmlController');

const router = express.Router();

// COVER PAGE
router.route('/').get(htmlController.getCoverPage);

// HOME PAGE
router.route('/home').get(htmlController.getHomePage);

module.exports = router;
