// // Ask if the user is logged in first
renderAppWithoutSession(); // Or render a loading spinner
// // then look for logged in user
renderAppWithSession();

function renderAppWithoutSession() {
    renderHeader();
    renderLoginForm();
}

function renderAppWithSession() {
    fetchSession().then((session) => {
        if(session) {
            renderHeader();
            mainPageElement();
        }
    })
}