const areaCode = require('../models/area_code');
const game_logs= require('../models/game_logs');
const logger = require('../logger/logger');

class GameController {
    async startGame(req,res){
        try{
            console.log("Game Started Successfully");
            return res.status(200).json({message:"Game Started Successfully",data:[]});

        }catch(error){
            
            logger.error(error);
            console.log(error);

            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }
}


module.exports = new GameController();