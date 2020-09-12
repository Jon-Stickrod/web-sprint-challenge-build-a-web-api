const express = require('express')

const { validateActionData, validateProjectActionId, validateActionId } = require('../middleware/validation.js')

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();


router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            if(actions){
                return res.status(200).json(actions)
            } else {
                return res.status(404).json({ error: 'No actions were found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error getting actions'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    Actions.get(id)
        .then(action => {
            if(action){
                console.log(action)
                res.status(200).json(action)
            } else {
                res.status(404).json({ error: `An action with an id of ${id} does not exist.`})
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: `There was an error getting the specified action`})
        })
})

router.post('/', validateProjectActionId(), validateActionData(), (req, res) => {
    const { project_id, description, notes } = req.body;
    Actions.insert({ project_id, description, notes })
        .then(posted => {
            console.log(posted)
            res.status(201).json(posted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error adding the new action'})
        })
}) 

router.put('/:id', validateProjectActionId(), validateActionData(), validateActionId(), (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    Actions.update(id, { project_id, description, notes })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error updating the action'})
        })
})

router.delete('/:id', validateActionId(), (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(deleted => {
            if(deleted){
                return res.status(200).json({ message: `Action id ${id} has been deleted`})
            } else {
                return res.status(500).json({ error: `There was an error deleting the action`})
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: `There was an error deleting the action`})
        })
})




module.exports = router;