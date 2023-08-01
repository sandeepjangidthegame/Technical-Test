const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const app  = express();
require('./database/connection');
dotenv.config({path: "./.env"});

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(require('./route/auth'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})