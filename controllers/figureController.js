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

// delete route for Figure
router.delete('/:figureId', (req, res) => {
    // console.log('DELETE figure');
    // set the value of the figure and accessory ids
    const figureId = req.params.figureId;

    // find figure in db by id
    ActionFigure.findById(figureId, (err, foundFigure) => {
      foundFigure.remove();
        res.redirect('/figures');
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

// CREATE Accessory EMBEDDED IN Figure
router.post('/:figureId/accessories', (req, res) => {
    console.log(req.body);
    // store new accessory in memory with data from request body
    const newAccessory = new Accessory({ accessoryName: req.body.accessoryName });
    
    // find figure in db by id and add new accessory
    ActionFigure.findById(req.params.figureId, (error, figure) => {
        console.log('figure:', figure)
        figure.accessories.push(newAccessory);
        figure.save((err, figure) => {
        res.redirect(`/figures/${figure.id}`);
        });
    });
    });

/// update route
router.put('/:id', (req, res) => { 
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

router.delete('/:figureId/accessories/:accessoryId', (req, res) => {

    // set the value of the figure and accessory ids
    const figureId = req.params.figureId;
    const accessoryId = req.params.accessoryId;
    
    // find figure in db by id
    ActionFigure.findById(figureId, (err, foundFigure) => {
        // find accessory embedded in figure
        foundFigure.accessories.id(accessoryId).remove();
        // update accessory text and completed with data from request body
        foundFigure.save((err, savedFigure) => {
        res.redirect(`/figures/${foundFigure.id}`);
        });
    });
    });

module.exports = router;