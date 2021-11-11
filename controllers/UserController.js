const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//import models
const Events = require("../models/EventModel")
const Users = require("../models/UserModel");

const Contacts = require("../models/ContactModel")
const { validationResult } = require("express-validator");
const passport = require("passport");
require("../passport")(passport);

const editUserInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Users.findById(req.user.id)
    .then((UserInfo) => {
      (UserInfo.fullname = req.body.fullname),
        (UserInfo.age = req.body.age),
        (UserInfo.gender = req.body.gender),
        (UserInfo.address = req.body.address),
        (UserInfo.phoneNumber = req.body.phoneNumber),
        (UserInfo.description = req.body.description),
        (UserInfo.birthday = req.body.birthday),
        UserInfo.save()
          .then(() => res.json({"User's information edit successfully": UserInfo}))
          .catch((error) => {
            res.json(error);
          });
    })
    .catch((error) => {
      res.json(error);
    });
};

// 4) get the info of the user
const getUser = async(req, res) =>{
   Users.findOne({ emailAddress: req.params.emailAddress }, async (err, user) => {
  if (err) throw err;
  res.json(user);
})
}

// 5）get user events by user email
const getAllEvents = async(req, res)=>{
  try {
    const user = await Users.findOne({ emailAddress: req.params.emailAddress },{});
    const eventsID = user.events.map(mongoose.Types.ObjectId);
    const allevents = await Events.aggregate([
      {
        $match:{_id:{$in:eventsID}},
      }
    ])
    res.json(allevents)
  }catch (err){
    res.send("Database query faild");
  }
}

// 6) get user contacts by user email
const getUserContacts = async(req,res)=>{
  try{
    const user = await Users.findOne({ emailAddress: req.params.emailAddress },{});
    const contactsIDs = user.contacts.map(mongoose.Types.ObjectId);
    const allContacts = await Contacts.aggregate([
      {
        $match:{_id:{$in:contactsIDs}},
      }
    ])
    res.json(allContacts)
  }catch(err){
    res.send("can't get contacts")
  }
}


// 7) delete user's account
const deleteUser = async (req, res) => {
  Users.findByIdAndDelete(req.user.id, async(err, finduser)=>{
    if (err) throw err;
    if(finduser.contacts!=null){
      Contacts.deleteMany({_id: {$in: finduser.contacts}}, async()=>{
        if(finduser.events!=null){
          Events.deleteMany({_id:{$in: finduser.events}})
            .catch((err) => {
              res.json(err.message);
            })
        }
      })
      .catch((err) => {
        res.json(err.message);
      })
      } 
  })
  .then(() => {      
    return res.json({"deleted user": req.user.id})  
  })
  .catch((err) => {
    res.json(err.message);
  });
}

module.exports = {
  getUser,
  editUserInfo,
  getAllEvents,
  getUserContacts,
  deleteUser
};
