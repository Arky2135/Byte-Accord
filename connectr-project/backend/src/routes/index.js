const express = require('express');
const router = express.Router();

// Import controllers
const { exampleController } = require('../controllers');

// Define routes
router.get('/example', exampleController);

// Export the router
module.exports = router;