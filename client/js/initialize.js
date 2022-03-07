// // Ask if the user is logged in first
// renderAppWithoutSession(); // Or render a loading spinner
// // then look for logged in user
renderAppWithSession();

function renderAppWithoutSession() {
    renderHeader();
    renderLoginForm();
}

function renderAppWithSession() {
    getSession().then((session) => {
        renderHeader(session);
        // waiting on payments (client/js/components/payments/index.js)
        mainPageElement(session);
    });
}
renderSignupForm();
