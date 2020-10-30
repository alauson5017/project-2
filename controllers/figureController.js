const router = require('express').Router();
const ActionFigure = require('../models/figures').ActionFigure;
const Accessory = require('../models/figures').Accessory;


// INDEX
router.get('/', (req, res)=>{
    ActionFigure.find({}, (error, allFigures)=>{
        res.render('figures/index.ejs', {
            figures: allFigures
        });
    });
  });

// NEW Figure FORM
router.get('/new', (req, res) => {
  res.render('figures/new.ejs');
});

// CREATE A NEW figure
router.post('/', (req, res) => {
  ActionFigure.create(req.body, (error, newFigure) => {
    res.send(newFigure);
  });
});

module.exports = router;