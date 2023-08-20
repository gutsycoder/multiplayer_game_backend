const logger = require('../logger/logger');
const gameLogs= require('../models/game_logs');

class gameService{
    async startGame(gameData){
        try{
            const {status,start_time,mode,area_code}=gameData;
            const new_log = new gameLogs({
                status,
                start_time,
                mode,
                area_code
            });

            await new_log.save();

            return new_log;


        }catch(error){
            logger.error(error);
            console.error(error);
            throw {status:error.status||500,message:error.message||"Something Went Wrong"};
        }
    }
    async endGame(gameData){
        try{
            const updatedGame = await gameLogs.findOneAndUpdate({_id:gameData.game_id}
                ,{$set:{status:"finished"}});
            return updatedGame;

        }catch(error){
            logger.error(error);
            throw {status:error.status||500, message:error.message||"Something Went Wrong"}
        }
    }

}

module.exports = new gameService();
