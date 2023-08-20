const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


router.post('/signup',playerController.signup);
router.post('/login',playerController.login);


module.exports = router;