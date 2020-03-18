const express=require('express');
const bodyParser=require('body-parser');
const { mongoose } = require("./../db/mongoose.js");
const{images}=require("./../models/images");

const {ObjectID}=require('mongodb');

const app=express();


app.get('/Images/:id', (req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send("invalid id");
    }
    
     images.findById(id).then((image)=>{
        if(!image){return res.status(404).send("can not find image");}
        res.send(image)
    
    }).catch((e)=>res.status(400).send());
    
    })

    app.listen(3000,()=>{console.log('started on port 3000 image');});
