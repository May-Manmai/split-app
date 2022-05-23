if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressSession = require('express-session');

// Controller imports
const paymentEventsController = require('./controllers/payments_event');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const paymentsController = require('./controllers/payments');

const pgSession = require('connect-pg-simple')(expressSession);
const db = require('./database/db');

//Middleware imports
const errorHandler = require('./middleware/error_handling');

// App
const port = process.env.PORT || 3000;
const app = express();

app.use(
    expressSession({
        store: new pgSession({
            pool: db,
            createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Pre-request middleware
app.use(express.json());
app.use(express.static('client'));

//Other middleware

// Controllers
app.use('/api/paymentsEvent/', paymentEventsController);
app.use('/api/users/', usersController);
app.use('/api/sessions/', sessionsController);
app.use('/api/payments/', paymentsController);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
