const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
//import models
const Contacts = require("../models/ContactModel");
const Users = require("../models/UserModel");

// get user contacts by user id
const getUserContacts = async (req, res) => {
    try {
        const allContacts = await Contacts.find({uid:req.user.id});
        return res.send(allContacts);
    } catch (err) {
        res.status(500);
        return res.send(err.message);
    }
};

const getOneContactById = async (req, res) => {
    try {
        const contact = await Contacts.findById(req.params.id);
        if(contact==null){
            return res.status(400).json("There is no such contact");
        }
        res.json(contact);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    };
   

//add contact
const createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Contacts.findOne(
        {emailAddress: req.body.emailAddress,
         uid:req.body.uid},
        async (err, contact) => {

        if (err) throw err;
        else if (contact) {
            return res.status(400).json({ msg: "Contact already exists" });

        } else if (!contact) {
            const contact = new Contacts({
                star: req.body.star,
                uid: req.body.uid,
                fullname: req.body.fullname,
                age: req.body.age,
                gender: req.body.gender,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                description: req.body.description,
                emailAddress: req.body.emailAddress,
                birthday: Date.parse(req.body.birthday)
            });
            contact.save();
            
            await Users.updateOne(
                {_id: req.body.uid},
                {$push: { contacts: contact._id}}
            )
            .then(() => {
                res.json(contact);
                
            })
            .catch((err) => {
                console.error(err.message);
                res.status(500).send("Server Error");
            });
        }
    })
};

const deleteContact = async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (contact == null){
        res.status(400)
        return res.send("Contact not found")
    } else{
        Contacts.deleteOne(contact, async(err)=>{
            if (err) throw err;
            await Users.updateOne(
                {_id: req.body.uid},
                {$pull: { contacts: req.params.id}}
            )
            .catch((err) => {
                console.error(err.message);
                res.status(500).send("Server Error");
            });
        })
        .then(() => res.json({"id": req.params.id, "success": "removed successfully"}))
        .catch((err) => {
        res.json(err.message);
    });
    }
    
};

const starContact = async (req, res) => {
    Contacts.findById(req.params.id)
        .then((Contact) => {
        (Contact.star= req.body.star),
            Contact.save()
            .then(() => {
                res.json(Contact)
                // if(req.body.star){
                //    res.json({"star contact": Contact})
                // } else{
                //     res.json({"unstar contact": Contact})
                // }
            })
            .catch((err) => {
                res.json(err.message);
            });
        })
        .catch((err) => {
        res.json(err.message);
        });
};

const editContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    Contacts.findById(req.params.id)
        .then(Contact => {
            Contact.fullname= req.body.fullname,
            Contact.gender= req.body.gender,
            Contact.phoneNumber= req.body.phoneNumber,
            Contact.description = req.body.description,
            Contact.emailAddress= req.body.emailAddress,
            Contact.birthday= Date.parse(req.body.birthday),

            Contact.save()
            .then(() => res.json(Contact))
            .catch(err => {res.json(err.message)}) 
        })
        .catch(err => {res.json(err.message)})  
    }; 

module.exports = {
    getUserContacts,
    getOneContactById,
    createContact,
    deleteContact,
    starContact,
    editContact
};
