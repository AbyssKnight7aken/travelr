const userController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const fs = require('fs');
const path = require('path');

const userManager = require('../managers/userManager');


userController.post('/register',
    body('username').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('email').isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const img = {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            }

            const result = await userManager.register(req.body.username, req.body.email, req.body.password, img);
            res.cookie('token', result.accessToken);
            res.json(result);
        } catch (err) {
            const message = parseError(err);
            console.log(message);
            res.status(400).json({ message });
        }
    });


userController.post('/login', async (req, res) => {
    try {
        const result = await userManager.login(req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(401).json({ message });
    }
});


userController.get('/logout', async (req, res) => {
    try {
        const token = req.token;
        await userManager.logout(token);
        res.status(204).json({ message: 'Successful logout!' });
    } catch (error) {
        const message = parseError(err);
        console.log(message);
        res.status(401).json({ message });
    }

});


userController.get('/profile', async (req, res) => {
    //console.log(req.user.email);
    try {
        const user = await userManager.getUserInfo(req.user.email);
        //console.log(user);
        res.status(200).json(user);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = userController;