    const mongoose = require('mongoose');
    const playerSchema = new mongoose.Schema({
        name:{
            type: String,
            required : true
        },
        user_id:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    });

    module.exports = mongoose.model('players',playerSchema);