const mongoose = require('mongoose');

const areaCodeSchema = new mongoose.Schema({
    area_code :{
        type: String,
        required : true
    },
    name : {
        type: String,
        required: true,
        uppercase: true
    },  
    city: {
        type : String,
        required: true,
        uppercase: true
    },
    state: {
        type: String,
        required: true,
        uppercase: true
    }

});

module.exports = mongoose.model('area_codes',areaCodeSchema);