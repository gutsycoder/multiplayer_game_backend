const logger = require('../logger/logger');
const Player = require('../models/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class PlayerService{
    async signUp(playerData){
        try{
            const userId = this.generateUserId();
            const hashedPassword = bcrypt.hashSync(password,10);
            //Creating a New Player
            
            const player = 

        }catch(error){
            logger.error(error);
            console.error(error);
            throw  {status:error.status||500,message:error.message||"Something Went Wrong"};
        }
    }
    async login(playerData){
        try{


        }catch(error){
            logger.error(error);
            console.error(error);
            throw {status:error.status||500,message:error.message||"Something Went Wrong"};
        }
    }

    async generateUserId(){
        return Math.random().toString(36).substring(7);
    }
}

module.exports = new PlayerService();