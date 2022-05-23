const express = require('express');
const isLoggedIn = require('../../middleware/is_logged_in');
const payments = require('../../models/payments');
const PaymentsEvent = require('../../models/payments_event');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    payments.getAll().then((payment) => {
        res.json(payment);
    });
});

router.get('/getById/:id', isLoggedIn, (req, res) => {
    payments.getById(req.params.id).then((payment) => {
        res.json(payment);
    });
});

router.get('/getPaymentsOwedToMe/:id', isLoggedIn, (req, res) => {
    payments.getPaymentsOwedToMe(req.params.id).then((payment) => {
        res.json(payment);
    });
});

router.get('/getPaymentsOwingToMe/:id', isLoggedIn, (req, res) => {
    payments.getPaymentsOwingToMe(req.params.id).then((payment) => {
        res.json(payment);
    });
});

router.get('/getPaymentsPaid/:id', isLoggedIn, (req, res) => {
    payments.getPaymentsPaid(req.params.id).then((payment) => {
        res.json(payment);
    });
});

router.patch('/updateBothStatus', isLoggedIn, (req, res) => {
    payments.updateBothStatus(req.body).then((payment) => {
        const body = {
            payment_event_id: payment.rows[0].payment_event_id,
            amount: payment.rows[0].amount,
            status: true,
        };
        PaymentsEvent.updateRemainingAmount(body).then((response) => {
            res.json(response);
        });
    });
});

router.patch('/updatePaidStatus/', isLoggedIn, (req, res) => {
    payments.updatePaidStatus(req.body).then((payment) => {
        res.json(payment);
    });
});

router.patch('/updateReceivedStatus/', isLoggedIn, (req, res) => {
    payments.updateReceivedStatus(req.body).then((payment) => {
        const updateBody = {
            amount: payment.rows[0].amount,
            payment_event_id: payment.rows[0].payment_event_id,
            status: true,
        };

        //modify status from update body to be false if the user is moving a paid item back to unpaid
        if (!req.body.received_status) {
            updateBody.status = false;
        }

        PaymentsEvent.updateRemainingAmount(updateBody).then((event) => {
            payments.getPaymentByEventId(event.id).then((response) => {
                let completedPayments = 0;
                response.rows.forEach((payments) => {
                    if (payments.received_status && payments.paid_status) {
                        completedPayments += 1;
                    }
                });
                if (
                    completedPayments === response.rows.length ||
                    !updateBody.status
                ) {
                    PaymentsEvent.updateCompletedStatus(
                        response.rows[0].payment_event_id,
                        updateBody.status
                    ).then((response) => {
                        return response;
                    });
                }
            });
        });

        res.json(payment);
    });
});

router.delete('/:id', isLoggedIn, (req, res) => {
    payments.delete(req.params.id).then(() => res.json({ status: 'ok' }));
});

module.exports = router;
