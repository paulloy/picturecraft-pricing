const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const PaperSchema = new Schema({
    name: {
        type: String,
    },
    length: {
        type: Number,
    },
    width: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    description: {
        type: String,
    }
});


const Paper = mongoose.model('paper', PaperSchema);

module.exports = Paper;