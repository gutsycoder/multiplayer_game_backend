const express= require('express');
const router = express.Router();
const authMiddleware= require('../middleware/checkAuth');
const gameController = require('../controllers/gameController');

router.use(authMiddleware);

router.post('/area/code',gameController.insertAreaCode);
router.post('/start',gameController.startGame);
router.put('/end',gameController.endGame);

module.exports = router;