const db = require('../database/db');

const Users = {
    getAll: () => {
        const query = 'SELECT * FROM users';
        return db.query(query).then(response => {
            return response.rows;
        })
    },

    getById: (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getByUsername: (username) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        return db.query(query, [username]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    getByEmail: (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        return db.query(query, [email]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    create: ({ first_name, username, password, email }) => {
        const query =
            'INSERT INTO users (first_name, username, password, email) VALUES($1, $2, $3, $4) RETURNING *';
        return db
            .query(query, [first_name, username.toLowerCase(), password, email.toLowerCase()])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
};

module.exports = Users;
