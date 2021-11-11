const mongoose = require("mongoose");
const Users = require("../models/UserModel")
const Events = require("../models/EventModel")

const create = async (req, res, next) => {

    const createvent = new Events({
        eventname: req.body.eventname,
        Address: req.body.Address,
        remainder:req.body.remainder,
        eventTime:Date.parse(req.body.eventTime),
        star:req.body.star,
        peoplewith:req.body.peoplewith,
        uid:req.body.uid
    })
  
    createvent.save()
    await Users.updateOne(
        {emailAddress: req.body.email},       
        {$push: { events: createvent._id}}
      )
    .then(data => {
        res.json(data)
    })
    .catch (error => {
        res.json(error)
    })
   

   
};

const GetallEvent = async(req,res) =>{
    try{
        const allevent = await Events.find({uid:req.user.id})
        return res.send(allevent)
    } catch (err){
        res.status(400)
        return res.send("database query failed")
    }

}

const getOneEvent = async(req,res) => {
    //const one= Events.findById(req.params.id, (err,oneevent) =>{
    //    if (err) throw err;
    //    //res.json(oneevent);
        //res.render("event":oneevent);
   //})
    //res.json(one);
    //console.log(res.json(one));
    //console.log(req.params.id);
    try {
        const oneevent = await Events.findById(req.params.id)
        if (oneevent == null){
            res.status(404)
            return res.send("Event not found")
        }
        
        return res.json(oneevent)
    } catch(err){
        res.status(400)
        return res.send('database failed')
    }
    
}

const updateEvent =  async(req,res) =>{
    Events.findById(req.params.id)
        .then (event=>{
            event.eventname= req.body.eventname,
            event.Address= req.body.Address,
            event.remainder= req.body.remainder,
            event.eventTime= Date.parse(req.body.eventTime),
            event.star= req.body.star,
            event.save()
            .then(()=> res.json('update event successfully'))
            .catch(error=> {res.json(error)})
        })
        .catch(error =>{res.json(error)})
    
}

const deleteEvent =  async(req,res,next) =>{
    Events.deleteOne({_id: req.params.id},err =>{
        if (err) throw err;
        else res.json({success:'remove success'});
    })
    await Users.updateOne(
        {emailAddress: req.params.email},
        
        {$pull: { events: req.params.id}}
      )
}

const setStar=async(req,res,next)=>{
    const event = {
        star: req.body.star
    }
    Events.findByIdAndUpdate(req.params.id,event, err =>{
        if (err) throw err;
        else res.json({success: 'update success'});
    });
}
module.exports = {
    create,updateEvent,GetallEvent,setStar, deleteEvent,getOneEvent
};

