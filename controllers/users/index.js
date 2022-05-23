const express = require('express');
const Users = require('../../models/users');
const userCreateValidator = require("./create_user_validation");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get('/:id', (req, res) => {
    Users.getById(req.params.id).then((user) => {
        res.json(user);
    });
});

router.get('/getByUsername/:username', (req, res) => {
    Users.getByUsername(req.params.username).then((username) => {
        res.json(username);
    });
});

router.get('/getByEmail/:email', (req, res) => {
    Users.getByEmail(req.params.email).then((email) => {
        res.json(email);
    });
});

router.get('/', (req, res) => {
    Users.getAll().then((email) => {
        res.json(email);
    })
});

router.post('/', userCreateValidator, (req, res) => {
    const user = req.body;

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

    Users.create(user)
        .then((user) => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.email = user.email;

            res.json(user);
        })
        .catch((error) => {
            res.status(400).json({
                message: "username or email invalid",
            });
        });
});

router.get('/', (req,res) => {
    Users.getAll().then((users) => {
        res.json(users);
    });
});

module.exports = router;
