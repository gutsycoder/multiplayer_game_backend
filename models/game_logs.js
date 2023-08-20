const mongoose = require('mongoose');
const gameLogSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum:['BATTLE ROYAL','TEAM DEATHMATCH','RUMBLE IN THE BOX'],
        required : true
    },
   start_time:{
    type: Date,
    required: true
   },
   end_time:{
    type: Date
   },
   status:{
    type: String,
    enum: ['started','finished'],
    required: true
   },
   area_code: {
    type: String,
    required : true
   },
   //user_ids: [String]
},{timestamps:true});

module.exports = mongoose.model('game_logs',gameLogSchema);