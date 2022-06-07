const express = require('express');
require("../src/db/connection");
const MensRanking = require("../src/models/mens")
const app = express();
const port = process.env.port || 3000;

//To read json format data from postman call express.json
app.use(express.json());
//Handle post request
app.post("/mens", async(req, res) => {
    try{
        const mensRecord = new MensRanking(req.body);
        console.log(req.body);
        const insertMensData = await mensRecord.save();
        res.status(201).send(insertMensData);
    }catch(e){
        res.status(400).send(e)
    }
})
//Read Data 
app.get("/mens", async(req, res) => {
    try{
        const getMens = await MensRanking.find({}).sort({"ranking":1});
        res.status(201).send(getMens);
    }catch(e){
        res.status(400).send(e)
    }
})
//Read data for individual
app.get("/mens/:id", async(req, res) => {
    try{
        const _id  = req.params.id;
        const getMen = await MensRanking.findById({_id:_id});
        res.status(201).send(getMen);
    }catch(e){
        res.status(400).send(e)
    }
})
//update individual data patch
app.patch("/mens/:id", async(req, res) => {
    try{
        const _id  = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate(_id, req.body,{
            new:true,
        });
        res.send(getMen);
    }catch(e){
        //server error will start from 500
        res.status(500).send(e)     
    }
})
//delete individual data
app.delete("/mens/:id", async(req, res) => {
    try{
        const _id  = req.params.id;
        const getMen = await MensRanking.findByIdAndDelete(_id);
        res.send(getMen);
    }catch(e){
        //server error will start from 500
        res.status(500).send(e)     
    }
})
app.listen(port, () => {
    console.log(`connection is live port no. ${port}`)
})