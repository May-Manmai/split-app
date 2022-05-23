const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const db = require('../database/db');

const Payments = {
    getAll: () => {
        const query = 'SELECT * FROM payments';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    getById: (id) => {
        const query = 'SELECT * FROM payments WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },

    getPaymentsOwingToMe: (id) => {
        const query =
            'SELECT payments.id AS payments_id, payments.user_id, payments_event.id AS event_id, payments_event.event_name, payments.paid_status, payments.received_status, payments.paid_date, payments_event.due_date, payments.amount, users.username from payments left join payments_event on payments_event.id = payments.payment_event_id left join users on payments_event.event_creator_id = users.id WHERE user_id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows;
        });
    },

    getPaymentsOwedToMe: (id) => { 
        const query =
            'SELECT payments.id AS payments_id, payments.user_id, payments_event.id AS event_id, payments_event.event_name, payments.paid_status, payments.received_status, payments.paid_date, payments_event.due_date, payments.amount, users.username, payments_event.event_creator_id from payments left join payments_event on payments_event.id = payments.payment_event_id left join users on payments.user_id = users.id WHERE payments_event.event_creator_id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows;
        });
    },

    getPaymentsPaid: (id) => {
        const query =
            'SELECT payments.id AS payments_id, payments.user_id, payments_event.id AS event_id, payments_event.event_name, payments.paid_status, payments.received_status, payments.paid_date, payments_event.due_date, payments.amount, users.username, payments_event.event_creator_id from payments left join payments_event on payments_event.id = payments.payment_event_id left join users on payments.user_id = users.id WHERE payments_event.event_creator_id = $1 and payments.received_status = true and user_id != $2';
        return db.query(query, [id, id]).then((response) => {
            return response.rows;
        });
    },
    updatePaidStatus: ({ paid_status, id }) => {
        const query =
            'UPDATE payments SET paid_status = $1 WHERE id = $2 RETURNING *';
        return db.query(query, [paid_status, id]).then((response) => {
            return response;
        });
    },
    updateReceivedStatus: ({ received_status, id }) => {
        if(received_status) {
            const query =
                'UPDATE payments SET received_status = $1, paid_date = current_date WHERE id = $2 RETURNING *';
            return db.query(query, [received_status, id]).then((response) => {
                return response;
            });
        } else {
            const query = 'UPDATE payments SET received_status = $1, paid_date = null WHERE id = $2 RETURNING *';
            return db.query(query, [received_status, id]).then((response) => {
                return response;
            });
        }
    },
    updateBothStatus: (body) => {
        const query =
            'UPDATE payments SET paid_status = true, received_status = true, paid_date = current_date WHERE payment_event_id = $1 and user_id = $2 RETURNING *';
        return db.query(query, [body.event_id, body.user_id]).then((response) => {
            return response;
        });        
    },
    getPaymentByEventId: (event_id) => {
        const query = 'SELECT * FROM payments WHERE payment_event_id = $1';
        return db.query(query, [event_id]).then(response => {
            return response;
        })
    },
    
    create: (body) => {
        const query = `INSERT INTO payments (user_id,amount,percentage,paid_status,received_status,paid_date,payment_event_id) VALUES ($1,$2,$3,false,false,null,$4) RETURNING *`;
        return db
            .query(query, [
                body.user_id,
                body.amount,
                body.percentage,
                body.payment_event_id,
            ])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    delete: (id) => {
        const query = `DELETE FROM payments WHERE id = $1`;
        return db.query(query, [id]);
    },
};

module.exports = Payments;
