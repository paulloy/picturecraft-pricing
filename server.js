require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");

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

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.port || 5000, function() {
    console.log('ready');
});
