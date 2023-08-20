const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = express();
const bodyParser = require('body-parser');
const game_status = require('./routes/game_status');
const player = require('./routes/player');




app.use(bodyParser.json());
app.use('/game',game_status);
app.use('/player',player);
mongoose.connect(process.env.DB_URI);
app.listen(port||3000,()=>{
    console.log(`Server Running On ${port}`);
});
