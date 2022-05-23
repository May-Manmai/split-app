//payments owed

function mainPageElement() {
    const page = document.getElementById('page');
    page.innerHTML = '';

    renderPaymentsOwed();
    renderPaymentsEventForMainPage();
    renderPaymentHistory();
}
