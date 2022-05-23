const express = require('express');
const Users = require('../../models/users');
const bcrypt = require('bcrypt');

const router = express.Router();

// Create Session (Login)
router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    function incorrectResponse(res) {
        res.status(400).json({
            message: 'Incorrect email or password',
        });
    }
    Users.getByEmail(email)
        .then((user) => {
            const valid = user && bcrypt.compareSync(password, user.password);

            if (valid) {
                req.session.user_id = user.id;
                req.session.email = user.email;
                req.session.username = user.username;

                res.json({
                    user_id: user.id,
                    email: email,
                    username: user.username,
                });
            } else {
                incorrectResponse(res);
            }
        })
        .catch((error) => {
            incorrectResponse(res);
        });
});

// Get Session (Login)
router.get('/', (req, res) => {
    if (req.session.email) {
        res.json({
            user_id: req.session.user_id,
            email: req.session.email,
            username: req.session.username,
        });
    } else {
        res.status(401).json({
            message: 'Not logged in',
        });
    }
});

//Delete Session (Logout)
router.delete('/', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

module.exports = router;
