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
router.get('/figures/:id', (req, res) => {
    res.render('figures/show.ejs', {
        figure: ActionFigure[req.params.id]
    })
})

// CREATE A NEW figure
router.post('/', (req, res) => {
  ActionFigure.create(req.body, (error, newFigure) => {
    res.send(newFigure);
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
        res.redirect('/figures');
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