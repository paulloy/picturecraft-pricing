require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

app.use('/api', require('./router/api'));

app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function() {
    console.log('ready');
});
