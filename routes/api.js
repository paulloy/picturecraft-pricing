const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');
const Ink = require('../models/ink');

// GET
// Get all paper
router.get('/paper', function(req, res, next) {
    Paper.find({}).then(function(paper) {
        res.send(paper);
    }).catch(next);
});
// Get one paper with id
// router.get('/paper/:id', function(req, res, next) {
//     Paper.findOne({_id: req.params.id}, req.body).then(function(paper) {
//         res.send(paper);
//     }).catch(next);
// })

// POST
router.post('/paper/create', function(req, res, next){
    const data = req.body;

    const newPaperModel = new Paper(data);
    newPaperModel.save(error => {
        if (error) {
            res.status(500).json({
                msg: 'Save rejected'
            });
        } else {
            res.json({
                msg: 'Data has been successfully added to the database'
            });
        }
    });
});

// PUT
router.put('/paper/:id', function(req, res, next){
    Paper.findOneAndUpdate({_id: req.params.id},req.body).then(function(paper) {
        Paper.findOne({_id: req.params.id}).then(function(paper) {
            res.send(paper);
        });
    });
});

// DELETE
router.delete('/paper/delete/:id', function(req, res, next){
    Paper.findByIdAndRemove({_id: req.params.id}, (error, deletedRecord) => {
        if (!error) {
            console.log(deletedRecord);
        } else {
            console.log(error);
        }
    });
});

// GET INK
router.get('/ink', function(req, res, next) {
    Ink.findOne({_id: '6164945ae7456e018cfbc0a1'}).then(function(ink) {
        res.send(ink);
    }).catch(next);
});

// UPDATE INK
router.put('/ink/update', function(req, res, next){
    Ink.findOneAndUpdate({_id: '6164945ae7456e018cfbc0a1'},req.body).then(function(paper) {
        Ink.findOne({_id: '6164945ae7456e018cfbc0a1'}).then(function(ink) {
            res.send(ink);
        });
    });
});

module.exports = router;