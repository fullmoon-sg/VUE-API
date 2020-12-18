const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil');
const ObjectId = MongoUtil.ObjectId;

router.get('/', async (req,res)=> {
    let db = MongoUtil.getDB();
    let faults = await db.collection('faults').find().toArray();
   res.send(faults);
})

router.post('/', async (req,res) => {
    let db=MongoUtil.getDB();
    let {
        title,location,tags,block,reporter_name,reporter_email,date
    } = req.body;
    tags = tags || [];
    tags = Array.isArray(tags) ? tags : [tags];
    date = new Date(date);
     let results = await db.collection('faults').insertOne({
         title,location,tags,block,reporter_name,reporter_email,date
     })
     res.send({
         'message' : 'New fault report has been created succesfully',
         'inserterdid' : results.insertedId
     })
})

module.exports = router;