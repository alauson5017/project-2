const router = require('express').Router();
const ActionFigure = require('../models/figures').ActionFigure;
const Accessory = require('../models/figures').Accessory;
const ToyLine = require('../models/toyLines').ToyLine;
// const Image = require('../models/figures').Image;
const Image = require('../models/image').Image; 
// var multer  = require('multer')
// var upload = multer({ dest: '../public/images/' })
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        console.log('multer req',req.body)
        console.log('multer file', file)
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
const upload = multer({ storage: storage });
const root = path.dirname(require.main.filename)
console.log("root", root)
// INDEX Route
router.get('/', (req, res)=>{

    ActionFigure.find({}, (error, allFigures)=>{
        res.render('figures/index.ejs', {
            figures: allFigures
        });
    });
  });
//SEED Route

// router.get('/seed', (req, res)=>{
//     ToyLine.create([
//         {
//             name:'GI Joe',
//             years: ["1982","1983","1984","1985","1986","1987","1988","1989"]
//         },
//         {
//             name:'Star Wars',
//             years: ["1977","1978","1979","1980","1981","1982","1983"]
//         },
//         {
//             name:'Transformers',
//             years: ["1984","1985","1986","1987"]
//         },

//     ], (err, data)=>{
//         res.redirect('/');
//     })
// });




// NEW Route
router.get('/new', (req, res) => {
    ToyLine.find({}, (error, toyLines)=> {
        // console.log("toyLines", toyLines)
        res.render('figures/new.ejs', {
            toyLineName: toyLines
        });
    })
});


// SHOW Route
router.get('/:id', (req, res) => {
    ActionFigure.findById(req.params.id, (err, foundFigure)=>{
        res.render('figures/show.ejs', { figure: foundFigure });
    });
    });

// delete route for Figure
router.delete('/:figureId', (req, res) => {
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
      console.log('body', req.body)
      
      if (req.body.doHave === 'on') {
          req.body.doHave = true;
        } else {
            req.body.doHave = false;
        }
        
        ActionFigure.create(req.body, (error, createdFigure)=>{
        res.redirect('/figures');
  });
});

// CREATE Accessory EMBEDDED IN Figure
router.post('/:figureId/accessories', (req, res) => {
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

// // CREATE Image EMBEDDED IN Figure
// Uploading the image 
router.post('/:id', upload.single('image'), (req, res, next) => { 
    const imgObj = {
        src: path.join( '/uploads/' + req.file.filename),
        contentType: req.file.mimetype,
        imgType: "main"
    }
    ActionFigure.findOneAndUpdate({"_id": req.params.id},
    {$set: {"image": imgObj}}, (error) => {
   
 
            res.redirect(`/figures/${req.params.id}`);
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

    /// update accessory
router.put('/:figureId/accessories/:accessoryId', (req, res) => { 
    const figureId = req.params.figureId;
    const accessoryId = req.params.accessoryId;

    if(req.body.doHave === 'on'){ 
        req.body.doHave = true
    } else { 
        req.body.doHave = false
    }

    ActionFigure.findOneAndUpdate({"_id": figureId, "accessories._id": accessoryId},
    {$set: {"accessories.$.accessoryName": req.body.accessoryName,"accessories.$.doHave": req.body.doHave}}, (error) => {
                res.redirect(`/figures/${req.params.figureId}`);
            });



    // ActionFigure.findByIdAndUpdate(figureId, {$set: {'accessories.accessoryName': req.body.accessoryName}}, function(err, doc) {
    //     console.log(doc);
    // });
    // Accessory.findByIdAndUpdate(req.params.accessoryId, req.body, (error) => {
    //         res.redirect(`/figures/${req.params.figureId}`);
    //     });

    // ActionFigure.findById(figureId, (err, foundFigure) => {
        // find accessory embedded in figure
        // console.log('before', ActionFigure.id(figureId).accessories.id(accessoryId))
        // ActionFigure.id(figureId).accessories.id(accessoryId).remove()
        // console.log('after', ActionFigure.id(figureId).accessories.id(accessoryId))
        // ActionFigure.id(figureId).accessories.push(res.body);
        // console.log('final', ActionFigure.id(figureId).accessories.id(accessoryId))

        // ActionFigure.id(figureId).save((err, figure) => {
        //     res.redirect(`/figures/${req.params.figureId}`, {
        //         figure: foundFigure,
        //         accessory: foundAccessory
        // });

        
        // foundFigure.accessories.id(accessoryId).remove();
        // foundFigure.accessories.push(res.body);
        // foundFigure.save((err, figure) => {
        //     res.redirect(`/figures/${req.params.figureId}`, {
        //         figure: foundFigure,
        //         accessory: foundAccessory
        // });

    // });


        // console.log('foundFigure',foundFigure)
        // console.log('req.body', req.body)
        // console.log('accessoryId', accessoryId)
        // console.log('find by id', foundFigure.accessories.id(accessoryId))
        // console.log('ActionFigure.findById(accessoryId)',ActionFigure.findById(accessoryId))
        // foundFigure.accessories.findByIdAndUpdate(accessoryId, req.body,(error) => {
        //     res.redirect(`/figures/${req.params.figureId}`);
        // })
        // f.accessories.findfindByIdAndUpdate(foundFigure.accessories.id(accessoryId))
        // foundFigure.accessories.id(accessoryId);
        // console.log("foundAccessory",foundAccessory)
        // res.render('accessories/edit.ejs', {
        //     figure: foundFigure,
        //     accessory: foundAccessory
            });
        
// })
// edit accessory
router.get("/:figureId/accessories/:accessoryId/edit", (req, res) => {
    const figureId = req.params.figureId;
    const accessoryId = req.params.accessoryId;
    // find figure in db by id
    ActionFigure.findById(figureId, (err, foundFigure) => {
        // find accessory embedded in figure
        const foundAccessory = foundFigure.accessories.id(accessoryId);
        // console.log("foundAccessory",foundAccessory)
        res.render('accessories/edit.ejs', {
            figure: foundFigure,
            accessory: foundAccessory
            });
        });
    });


    // delete accessory
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