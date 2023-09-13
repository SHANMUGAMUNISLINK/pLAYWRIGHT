require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Model = require('../models/model');
const router = express.Router();


router.post('/post', async (req, res) => {
const data = new Model({
name: req.body.name,
age: req.body.age
});
try {
const dataToSave = await data.save();
res.status(200).json(dataToSave);
}
catch (error) {
res.status(400).json({ message: error.message });
}
});

router.get('/getAll', async (req, res) => {
try {
const data = await Model.find();
res.json(data);
}
catch (error) {
res.status(500).json({ message: error.message });
}
});

router.get('/getOne/:id', async (req, res) => {
try {
const data = await Model.findById(req.params.id);
res.json(data);
}
catch (error) {
res.status(500).json({ message: error.message });
}
});


router.patch('/update/:id', async (req, res) => {
try {
const id = req.params.id;
const updatedData = req.body;
const options = { new: true };

const result = await Model.findByIdAndUpdate(
id, updatedData, options
);

res.send(result);
}

catch (error) {
res.status(500).json({ message: error.message });
}
});


router.delete('/delete/:id', async (req, res) => {

try {
const id = req.params.id;
const data = await Model.findByIdAndDelete(id);
res.send(`Document with ${data.name} has been deleted.`);
}

catch (error) {
res.status(400).json({ message: error.message });
}
});


router.get('/searchItems', async (req, res) => {
    try {
      const name = req.query.name; 
      const id = req.query.id;
      const regex = new RegExp(name, 'i'); 
      const data = await Model.findOne({name: {$regex: regex}, _id: id}); 
      res.json(data); 
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;