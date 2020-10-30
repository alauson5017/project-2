const router = require('express').Router();
const ActionFigure = require('../models/figures').ActionFigure;
const Accessory = require('../models/figures').Accessory;


// INDEX Route
router.get('/', (req, res)=>{
    ActionFigure.find({}, (error, allFigures)=>{
        res.render('figures/index.ejs', {
            figures: allFigures
        });
    });
  });

// NEW Route
router.get('/new', (req, res) => {
  res.render('figures/new.ejs');
});

// SHOW Route
router.get('/:id', (req, res) => {
    ActionFigure.findById(req.params.id, (err, foundFigure)=>{
        res.render('figures/show.ejs', { figure: foundFigure });
    });
    });

// POST
router.post('/', (req, res) => {
  ActionFigure.create(req.body, (error, newFigure) => {
    if (req.body.hasPackaging === 'on') {
        req.body.hasPackaging = true;
    } else {
        req.body.hasPackaging = false;
    }
    if (req.body.doHave === 'on') {
        req.body.doHave = true;
    } else {
        req.body.doHave = false;
    }
    ActionFigure.create(req.body, (error, createdFigure)=>{
        res.redirect('/figures');
    });
  });
});

/// update route
router.put('/figures/:id', (req, res) => { 
	if(req.body.hasPackaging === 'on'){ 
		req.body.hasPackaging = true
	} else { 
		req.body.hasPackaging = false
    }
    if(req.body.doHave === 'on'){ 
        req.body.doHave = true
    } else { 
        req.body.doHave = false
    }
	ActionFigure.findByIdAndUpdate(req.params.id, req.body, (error) => {
        res.redirect('/figures/');
    });
})

// EDIT
router.get("/:id/edit", (req, res) => {
    ActionFigure.findById(req.params.id, (error, foundFigure) => {
        res.render('figures/edit.ejs', {
        figure: foundFigure
        });
    })
    });

module.exports = router;