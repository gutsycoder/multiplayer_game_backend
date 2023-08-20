const express= require('express');
const router = express.Router();
const GameController= require('../controllers/gameController');


router.get('/start',GameController.startGame);

module.exports = router;