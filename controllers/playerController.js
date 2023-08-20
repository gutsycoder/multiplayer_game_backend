const logger = require('../logger/logger');
const Player = require('../models/player');


class PlayerController{
    async signup(req,res){
        try{
            const {name,email,password}= req.body;
            //Part of Implementing the DTO 
            if(!name){
                return res.status(400).json({message:"Name Is Required",data:[]});
            }
            if(!email){
                return res.status(400).json({message:"E-mail Id Is Required",data:[]});
            }
            if(!password){
                return res.status(400).json({message:"Password Is Required",data:[]});
            }
            const playerExists = await Player.findOne({email});
            if(playerExists){
                return res.status(400).json({message:"Email Id Is Already Registerd"});
            }
            const playerData={};
            playerData.name=name;
            playerData.email=email;
            playerData.password=password;



            
        }catch(error){
            logger.error(error);
            console.error(error);
            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }

    async login(req,res){
        try{

        }catch(error){
            logger.error(error);
            console.error(error);
            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }

}

module.exports = new PlayerController();