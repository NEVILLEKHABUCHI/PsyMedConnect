const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsControllers');

router.get('/', clientsController.getHome);
router.get('/about', clientsController.getAbout);
router.get('/contact', clientsController.getContacts);
router.get('/submitDetails', clientsController.getSubmitDetails);

module.exports = router;