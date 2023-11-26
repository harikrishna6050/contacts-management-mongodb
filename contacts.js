const express = require('express');
const mongoose = require("mongoose");

const app = express();
/**
 * @description "Understand JSON Data"
 */
app.use(express.json());

/**
 * @description "Create MongoDB connection and create 'contects database'"
 */
mongoose.connect("mongodb://localhost/contacts");

/**
 * @description "Create Contacts Collection schema"
 */
const _CONTACTS_SCHEMA = mongoose.Schema({
    name: String,
    email: String,
    phone: Number
})

const ContactCollection = mongoose.model("contact", _CONTACTS_SCHEMA);

/**
 * @description "Get All Contacts from the Collection(contact table)"
 */
app.get("/contacts", async(req, res) => {
    try {
        const contacts = await ContactCollection.find();
        res.send(contacts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @description "Get Particular Contact Details"
 */
app.get('/contact/:id', async(req, res) => {
    try {
        const _SINGLE_CONTACT_RES = await ContactCollection.findById(req.params.id);
        res.send(_SINGLE_CONTACT_RES);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @description "Create New Contact"
 */
app.post("/newcontact", async(req, res) => {
    const _NEW_CONTACT = new ContactCollection({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        const _NEW_CONTACT_RES = await _NEW_CONTACT.save();
        res.status(201).json(_NEW_CONTACT_RES);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @description "Update Particular Existing Contact Details"
 */
app.put("/updatecontact/:id", async(req, res) => {
    try {
        const _UPDATE_CONTACT_RES = await ContactCollection.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });

        res.send(_UPDATE_CONTACT_RES);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @description "Delete Particular Contact"
 */
app.delete("/deletecontact/:id", async(req, res) => {
    try {
        const _DELETE_CONTACT_RES = await ContactCollection.findByIdAndDelete(req.params.id);
        res.send(_DELETE_CONTACT_RES);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});





/**
 * @description "Server Listen"
 */
app.listen(3000, () => {
    console.log("Server is running");
});