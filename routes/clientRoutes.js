const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsControllers');

router.get('/', clientsController.getHome);

module.exports = router;