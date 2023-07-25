const fs = require('fs');
const path = require('path');
const moment = require('moment');


const logController = require('express').Router();

const logManager = require('../managers/logManager')
const { isAuth, auth } = require('../middlewares/authMiddleware')
const { parseError } = require('../util/parser');


logController.get('/rescent', async (req, res) => {
    const logs = await logManager.getRescent();
    res.json(logs);
});

logController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await logManager.getByUserId(userId);
    } else {
        items = await logManager.getAll();
    }
    res.json(items);
});

//TODO: Turn on Guards and add userId...
logController.post('/', async (req, res) => {
    

    console.log('====================req.body=================================');
    console.log(req.body.img);
    console.log('====================req.file=================================');
    console.log(req.file);
    try {

        //====================================================================

        const data = {
            "name": req.body.name,
            "date": moment(req.body.date).format('LLLL'),
            "description": req.body.description,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            },
            "location": req.body.location,
            "_ownerId": req.user._id
        };


        const newLog = await logManager.create(data);
        console.log('Created!');
        res.json(newLog);


        //const data = Object.assign({ _ownerId: req.user._id }, req.body);
        //const data = Object.assign(req.body);
        //const item = await logManager.create(data);
        //res.json(item);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

logController.get('/:id', async (req, res, next) => {
    const item = await logManager.getById(req.params.id);
    console.log(item);
    res.json(item);
});

logController.put('/:id', isAuth, async (req, res, next) => {
    const item = await logManager.getById(req.params.id);
    console.log('req.user', req.user._id);
    console.log('item._ownerId', item._ownerId._id.toString());
    if (req.user._id != item._ownerId._id.toString()) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {

        const data = {
            "name": req.body.name,
            "date": moment(req.body.date).format('LLLL'),
            "description": req.body.description,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            },
            "location": req.body.location,
            "_ownerId": req.user._id
        };

        const updatedLog = await logManager.update(req.params.id, data);
        console.log('updated!');
        res.json(updatedLog);
        
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

logController.delete('/:id', isAuth, async (req, res) => {
    const item = await logManager.getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await logManager.deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = logController;