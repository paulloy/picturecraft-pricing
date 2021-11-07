const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const InkSchema = new Schema({
    cost: {
        type: Number
    },
    volume: {
        type: Number
    },
    profitPercentage: {
        type: Number
    },
    inkCostPerUnitSquareInch: {
        type: Number
    }
});


const Ink = mongoose.model('ink', InkSchema);

module.exports = Ink;