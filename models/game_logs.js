const mongoose = require('mongoose');
const gameLogSchema = new mongoose.Schema({
    mode: {
        type: String,
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
},{timestamps:true});

module.exports = mongoose.model('game_logs',gameLogSchema);