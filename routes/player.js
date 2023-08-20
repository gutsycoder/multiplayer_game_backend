const express = require('express');
const router = express.Router();

router.post('/signup',playerController.signup);
router.post('/login',playerController.login);


module.exports = router;