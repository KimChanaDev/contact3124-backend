const express = require('express')
const router = express.Router()
const contactsModel = require('../model/contacts.js')

// show all contact
router.get('/contacts', async (req, res) => {
    try {
        const result = await contactsModel.showAll()
        res.json( result )
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// show one contact
router.get('/contacts/:id', async (req, res) => {
    try {
        const result = await contactsModel.showOne( req.params.id )
        res.json( result )
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// add contact
router.post('/contacts', async (req, res) => {
    try {
        await contactsModel.addContact( req.body )
        res.json( req.body )
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// update contact
router.post('/contacts/:id', async (req, res) => {
    try {
        const updateResult = await contactsModel.updateContact( req.params.id , req.body )
        res.json( updateResult )
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// delete contact
router.delete('/contact/:id', async (req, res) => {
    try {
        const queryResult = await contactsModel.showOne( req.params.id )
        const deleteResult = await contactsModel.deleteContact( req.params.id )
        if( deleteResult.deletedCount === 1){
            res.json({ 
                message: 'This contact has been deleted',
                firstname: queryResult.firstname
            })
        } else {
            res.json({})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

module.exports = router



