const areaCode = require('../models/area_code');
const game_logs= require('../models/game_logs');
const logger = require('../logger/logger');
const gameServices = require('../services/gameService');

class GameController {
    async startGame(req,res){
        try{
            console.log("Game Started Successfully");
            const {area_code,mode}= req.body;
            if(!area_code || !mode){  
                return res.status(400).json({message:"Area Code And Mode Is Mandatory",data:[]});
            }
            const isValidAreaCode = await areaCode.find({area_code});
            if(!isValidAreaCode){
                return res.status(400).json({message:"Area Code Not Valid",data:[]});
            }
            //Implementing The DTO 
            const gameData={};
            gameData.area_code=area_code;
            gameData.mode=mode;
            gameData.status="started";
            gameData.start_time = new Date();
            const savedGameLog = await gameServices.startGame(gameData);
            return res.status(200).json({message:"Game Started Successfully",data:savedGameLog});
            
        }catch(error){
            
            logger.error(error);
            console.log(error);

            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }

 async insertAreaCode(req,res){
    try{
        const {area_code,name,city,state}=req.body;
        if(!name || !area_code || !name ||! city || !state){
            return res.status(400).json({message:"Area Code,Area Name,City,State Are Mandatory",data:[]});
        }
        const newArea = new areaCode({
            name,
            area_code,
            city,
            state
        });

        const savedArea= await newArea.save();

        return res.status(200).json({message:"Area Is Inserted",data:savedArea});

    }catch(error){
        logger.error(error);
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong",data:[]});
    }
 }

 async endGame(req,res){
    try{
        const {game_id}= req.body;
        if(!game_id){
            return res.status(400).json({message:"game_id is mandatory",data:[]});
        }
        //Should Add Validation that authorized user should be able to end the Game ,not any user
        const gameData={};
        gameData.game_id=game_id;
        const updatedGame = await gameServices.endGame(gameData);

        return res.status(200).json({message:"Game Ended Successfully",data:[]});

    }catch(error){
        logger.error(error);
        console.error(error);
        return res.status(500).json({message:"Something Went Wrong",data:[]});
    }
 }

}

module.exports = new GameController();