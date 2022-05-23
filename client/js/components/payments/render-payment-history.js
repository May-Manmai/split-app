//payment history
function renderPaymentHistory() {
    const session = getSession();
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
    <section id="all-history-section">
        <h1>HISTORY</h1>
        <h6 style="color: red" id="displayError"></h6>
    </section>
    `;

    const displayError = document.querySelector('#displayError');

    let status;

    //this gets payments that have been completed, we will need to add in payments we have paid
    axios
        .get(`/api/payments/getPaymentsPaid/${user_id}`) // need to change
        .then((response) => {
            const paymentsHistory = response.data;

            if (paymentsHistory.length > 0) {
                const historySection = document.getElementById(
                    'all-history-section'
                );
                const paymentHistory = document.createElement('section');
                paymentHistory.setAttribute('id', 'payments_history_section');
                paymentHistory.innerHTML += `<h3>Payment History</h3>`;
                historySection.appendChild(paymentHistory);
                let table = document.createElement('table');
                table.setAttribute('id', 'paymentsHistoryTable');
                table.setAttribute('class', 'table');
                let thead = document.createElement('thead');
                thead.setAttribute('id', 'paymentsHistoryTableHead');
                let tbody = document.createElement('tbody');
                tbody.setAttribute('id', 'paymentsHistoryTableBody');
                tbody.setAttribute('scope', 'col');

                table.appendChild(thead);
                table.appendChild(tbody);

                const paymentHistorySection = document.getElementById(
                    'payments_history_section'
                );

                paymentHistorySection.appendChild(table);

                let row_heading = document.createElement('tr');
                let heading_1 = document.createElement('th');
                heading_1.innerHTML = 'Event Name';
                let heading_2 = document.createElement('th');
                heading_2.innerHTML = 'Creator';
                let heading_3 = document.createElement('th');
                heading_3.innerHTML = 'Paid Date';
                let heading_4 = document.createElement('th');
                heading_4.innerHTML = 'Amount';

                row_heading.appendChild(heading_1);
                row_heading.appendChild(heading_2);
                row_heading.appendChild(heading_3);
                row_heading.appendChild(heading_4);
                thead.appendChild(row_heading);
            }

            paymentsHistory.forEach((payment) => {
                status = 'PAID - Confirmed';

                if (
                    payment.paid_status &&
                    payment.received_status &&
                    payment.user_id !== payment.event_creator_id
                ) {
                    let row = document.createElement('tr');
                    let row_data_1 = document.createElement('td');
                    row_data_1.innerHTML = `${payment.event_name}`;
                    let row_data_2 = document.createElement('td');
                    row_data_2.innerHTML = `${payment.username}`;
                    let row_data_3 = document.createElement('td');
                    row_data_3.innerHTML = `${moment(payment.paid_date).format(
                        'D MMMM YYYY'
                    )}`;
                    let row_data_4 = document.createElement('td');
                    row_data_4.innerHTML = `$ ${payment.amount}`;

                    row.appendChild(row_data_1);
                    row.appendChild(row_data_2);
                    row.appendChild(row_data_3);
                    row.appendChild(row_data_4);
                    const paymentsHistoryTableBody = document.getElementById(
                        'paymentsHistoryTableBody'
                    );
                    paymentsHistoryTableBody.appendChild(row);
                }
            });
        })
        .catch((error) => {
            clearErrors();
            console.log(error);
            const displayError = document.querySelector('#displayError');
            displayError.innerText = error.response.data.message;
        });
}
