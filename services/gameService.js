const logger = require('../logger/logger');
const gameLogs= require('../models/game_logs');

const redis = require('redis');
const redisOptions = {
    host: '127.0.0.1', // Change this to your Redis server's host
    port: 6379 // Change this to the desired port number
};


const {promisify} = require('util');






const cache_ttl_seconds = process.env.CACHE_TTL_SECONDS;


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

    async mostPlayedGameCurrent(area_code){
        try{
            
            //Checking if the information exists in Redis 
            const client = redis.createClient(redisOptions);
            console.log(redisOptions);
            await client.connect();
            const cachedResult = await client.hGetAll(area_code);
            const cachedGames = JSON.parse(cachedResult.topModes);

            
            console.log(cachedGames);

            if(cachedGames.length&&0){
                console.log("Cache Hit");
                return cachedGames;
                
            }else{

                //Query to find the most played game modes
                console.log("Cache Miss");

               
                const mostPlayedGames = await gameLogs.aggregate([
                    // Match documents with the specified area_code and status 'started'
                    { $match: { area_code, status: 'started' } },
                    // Group by mode and calculate the count for each mode
                    { $group: { _id: '$mode', count: { $sum: 1 } } },
                    // Sort by count in descending order
                    { $sort: { count: -1 } },
                    // Group again to find the maximum count
                    {
                        $group: {
                            _id: null,
                            maxCount: { $max: '$count' },
                            modes: { $push: { mode: '$_id', count: '$count' } }
                        }
                    },
                    // Project the desired fields and exclude the _id field
                    {
                        $project: {
                            _id: 0,
                            maxCount: 1,
                            modes: {
                                $filter: {
                                    input: '$modes',
                                    as: 'mode',
                                    cond: { $eq: ['$$mode.count', '$maxCount'] }
                                }
                            }
                        }
                    }
                ])
                
                
                
                console.log(mostPlayedGames);

                if(mostPlayedGames.length>0){
                    const maxCount = mostPlayedGames[0].maxCount;
                    const topModes = mostPlayedGames[0].modes;
                    console.log(topModes);
                    console.log(area_code);
                    //Cache the result in the redis 
                    await client.hSet(area_code,'topModes',JSON.stringify(topModes));

                    //Set TTL for the cached data

                    

                    return topModes;

                }else{
                    return null;
                }


            }
        }catch(error){
            logger.error(error);
            console.log(error);
            throw {status:error.status||500,message:error.message||"Something Went Wrong"};
        }
    }

}


module.exports = new gameService();
