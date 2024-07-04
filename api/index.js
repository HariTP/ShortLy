const express = require('express');
const app = express();
const connectDB = require('./config/connection');
const router = require('./routes/url');
const PORT = 4000;
const cors = require('cors')

connectDB("mongodb://localhost:27017/UrlShort");

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/',router);

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT} !`);
})