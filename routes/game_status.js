const express= require('express');
const router = express.Router();
const GameController= require('../controllers/gameController');
const authMiddleware= require('../middleware/checkAuth');
router.use(authMiddleware);


router.get('/start',GameController.startGame);

module.exports = router;