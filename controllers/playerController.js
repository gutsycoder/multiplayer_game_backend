const logger = require('../logger/logger');
const Player = require('../models/player');
const PlayerService = require('../services/playerService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

            const player =await PlayerService.signUp(playerData);

            return res.status(200).json({message:"Sign Up Successfull",data:player});
        }catch(error){
            logger.error(error);
            console.error(error);
            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }

    async login(req,res){
        try{
            const {email,password} = req.body;

            //Finding the player by email 
            const player = await Player.findOne({email});
            if(!player){
                return res.status(401).json({message:"Email ID Not Registered",data:[]});
            }
            //Comparing the password 

            const isPasswordMatch = bcrypt.compareSync(password,player.password);

            if(!isPasswordMatch){
                return res.status(401).json({message:"Invalid Credentials",data:[]});
            }

            const token = jwt.sign({
                user_id: player.user_id,
                email: player.email,
                name: player.name
            },process.env.JWT_SECRET,{expiresIn: '48h'});

            return res.status(200).json({message:"Login Successfull",data:token});


        }catch(error){
            logger.error(error);
            console.error(error);
            return res.status(500).json({message:"Something Went Wrong",data:[]});
        }
    }

}

module.exports = new PlayerController();