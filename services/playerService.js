const logger = require('../logger/logger');
const Player = require('../models/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class PlayerService{
    async signUp(playerData){
        try{
            const user_id = await this.generateUserId();
            const {name,email,password}= playerData;
            const hashedPassword = bcrypt.hashSync(password,10);
            //Creating a New Player
            
            const player = new Player({
                name,
                user_id,
                email,
                password: hashedPassword
            });

            //Saving the player
            await player.save();

            //Implementing the JWT Token  

            const token =  jwt.sign({
                user_id: player.user_id,
                email: email,
                name : name
            },process.env.JWT_SECRET,{expiresIn:'1h'});
            
            return token;

        }catch(error){
            logger.error(error);
            console.error(error);
            throw  {status:error.status||500,message:error.message||"Something Went Wrong"};
        }
    }
    
    async generateUserId(){
        return Math.random().toString(36).substring(7);
    }
}

module.exports = new PlayerService();