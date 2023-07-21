const fs = require('fs');
const path = require('path');

const multer = require("multer");
const logController = require('express').Router();

const logManager = require('../managers/logManager')
const { isAuth, auth } = require('../middlewares/authMiddleware')
const { parseError } = require('../util/parser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }).single('img');


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
logController.post('/', isAuth, async (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        //console.log(req.file.path);
        console.log(req.file);
    })

    console.log('=====================================================');
    console.log(req.body);
    console.log(req.file);
    console.log('=====================================================');
    try {

        //====================================================================

        const data = {
            "name": req.body.name,
            "date": req.body.date,
            "description": req.body.description,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
              },
            "location": req.body.location,
            //"_ownerId": req.user._id
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
    res.json(item);
});

logController.put('/:id', isAuth, async (req, res, next) => {
    const item = await logManager.getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        const result = await logManager.update(req.params.id, req.body);
        res.json(result);
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