function addSelectListenersForOwing() {
    const selectElements = document.querySelectorAll('.selectPaymentOwing');

    for (let i = 0; i < selectElements.length; i++) {
        selectElements[i].addEventListener('change', (event) => {
            let paid_status;
            if (event.target.value.includes('UNPAID')) {
                paid_status = false;
            } else {
                paid_status = true;
            }
            const body = {
                id: parseInt(event.target.attributes.identifier.textContent),
                paid_status: paid_status,
            };

            axios
                .patch('/api/payments/updatePaidStatus', body)
                .then((response) => {
                    setTimeout(() => {
                        mainPageElement(getSession());
                    }, 2000);
                    const displaySuccess =
                        document.querySelector('#displaySuccess');
                    displaySuccess.innerText =
                        'Update Successful, page will refresh.';
                })
                .catch((error) => {
                    clearErrors();
                    const displayError =
                        document.querySelector('#displayError');
                    displayError.innerText = error.response.data.message;
                });
        });
    }
}

function addSelectListenersForOwed() {
    const selectElements = document.querySelectorAll('.selectPaymentOwed');

    for (let i = 0; i < selectElements.length; i++) {
        selectElements[i].addEventListener('change', (event) => {
            let received_status;
            if (event.target.value.includes('PAID')) {
                received_status = true;
            } else {
                received_status = false;
            }

            const body = {
                id: parseInt(event.target.attributes.identifier.textContent),
                received_status: received_status,
            };

            axios
                .patch('/api/payments/updateReceivedStatus', body)
                .then((response) => {
                    setTimeout(() => {
                        mainPageElement(getSession());
                    }, 2000);
                    //show status updated successfully
                    const displaySuccess =
                        document.querySelector('#displaySuccess');
                    displaySuccess.innerText =
                        'Update Successful, page will refresh.';
                })
                .catch((error) => {
                    clearErrors();
                    const displayError =
                        document.querySelector('#displayError');
                    displayError.innerText = error.response.data.message;
                });
        });
    }
}

function renderPaymentsOwed() {
    const session = getSession();
    user_id = session.user_id;

    const page = document.getElementById('page');
    page.innerHTML += `
    <section id="intro" class="intro">
        
                <div class="slogan">
                    <h2 style="font-weight: 900; font-size: 80px"><img src="../../split-logo.png" id="logo_main_page" class="main-page img-fluid hlogo rounded" width="150"><span style="color: ;">P</span><span style="color: ">L</span><span style="color: ">I</span><span style="color: ;">T</span></h2>

                    <div class="test"><h4>Create</h4></div> 
                    <div class="test"> 
                    <span><h4>Split and Track</h4></span>
                    </div>
    </section>

    
    <section id="all-payments-section">
   
            
                <h1 style="font-weight: 600; color:  rgb(46, 3, 67)">PAYMENTS</h1>
                <h6 style="color: red" id="displayError"></h6>

                <section id="payments_owing_section">
                
                    <h3>Payments Owing</h3>
                    <h6 style="color: green" id="displaySuccess"></h6>
                </section>

                <section id="payments_owed_to_me">
                    <h3>Payments Owed To Me</h3>
                    <h6 style="color: green" id="displaySuccess"></h6>
                </section>
            
   
    </section>
    
    `;

    const displayError = document.querySelector('#displayError');

    axios
        .get(`/api/payments/getPaymentsOwingToMe/${user_id}`)
        .then((response) => {
            const payments = response.data;
            const paymentsOwingSection = document.getElementById(
                'payments_owing_section'
            );

            let table = document.createElement('table');
            table.setAttribute('id', 'paymentsOwingTable');
            table.setAttribute('class', 'table');
            let thead = document.createElement('thead');
            thead.setAttribute('id', 'paymentsOwingTableHead');
            let tbody = document.createElement('tbody');
            tbody.setAttribute('id', 'paymentsOwingTableBody');
            tbody.setAttribute('scope', 'col');

            table.appendChild(thead);
            table.appendChild(tbody);

            paymentsOwingSection.appendChild(table);

            let row_heading = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = 'Event Name';
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = 'Username';
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = 'Due Date';
            let heading_4 = document.createElement('th');
            heading_4.innerHTML = 'Amount';
            let heading_5 = document.createElement('th');
            heading_5.innerHTML = 'Status';

            row_heading.appendChild(heading_1);
            row_heading.appendChild(heading_2);
            row_heading.appendChild(heading_3);
            row_heading.appendChild(heading_4);
            row_heading.appendChild(heading_5);
            thead.appendChild(row_heading);

            payments.forEach((payment) => {
                if (payment.user_id !== payment.event_creator_id) {
                    let status = '';
                    if (!payment.paid_status && !payment.received_status) {
                        status = 'UNPAID';
                    } else if (
                        payment.paid_status &&
                        !payment.received_status
                    ) {
                        status = 'PAID - Payer Notified';
                    }
                    if (!payment.received_status) {
                        let row = document.createElement('tr');
                        let row_data_1 = document.createElement('td');
                        row_data_1.innerHTML = `${payment.event_name}`;
                        let row_data_2 = document.createElement('td');
                        row_data_2.innerHTML = `${payment.username}`;
                        let row_data_3 = document.createElement('td');
                        row_data_3.innerHTML = `${moment(
                            payment.due_date
                        ).format('D MMMM YYYY')}`;
                        let row_data_4 = document.createElement('td');
                        row_data_4.innerHTML = `$ ${payment.amount}`;
                        let row_data_5 = document.createElement('td');

                        const selectList = document.createElement('select');
                        selectList.classList.add('selectPaymentOwing');
                        selectList.classList.add('form-select');
                        selectList.setAttribute(
                            'identifier',
                            payment.payments_id
                        );

                        row_data_5.appendChild(selectList);

                        let optionOne = document.createElement('option');
                        let optionTwo = document.createElement('option');
                        optionOne.value = 'UNPAID';
                        optionOne.text = 'UNPAID';
                        optionTwo.value = 'PAID - PAYER NOTIFIED';
                        optionTwo.text = 'PAID - PAYER NOTIFIED';

                        if (status.includes('UNPAID')) {
                            selectList.add(optionOne, null);
                            selectList.add(optionTwo, null);
                        } else {
                            selectList.add(optionTwo, null);
                            selectList.add(optionOne, null);
                        }

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        row.appendChild(row_data_5);
                        tbody.appendChild(row);
                    }
                }
            });

            setTimeout(() => {
                addSelectListenersForOwing();
            }, 1000);
        })
        .catch((error) => {
            clearErrors();
            const displayError = document.querySelector('#displayError');
            displayError.innerText = error.response.data.message;
        });

    axios
        .get(`/api/payments/getPaymentsOwedToMe/${user_id}`)
        .then((response) => {
            const payments = response.data;
            const paymentsOwedToMe = document.getElementById(
                'payments_owed_to_me'
            );

            let table = document.createElement('table');
            table.setAttribute('id', 'paymentsOwingTable');
            table.setAttribute('class', 'table');
            let thead = document.createElement('thead');
            thead.setAttribute('id', 'paymentsOwingTableHead');

            let tbody = document.createElement('tbody');
            tbody.setAttribute('id', 'paymentsOwingTableBody');
            tbody.setAttribute('scope', 'col');

            table.appendChild(thead);
            table.appendChild(tbody);
            paymentsOwedToMe.appendChild(table);

            let row_heading = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = 'Event Name';
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = 'Username';
            let heading_3 = document.createElement('th');
            heading_3.innerHTML = 'Due Date';
            let heading_4 = document.createElement('th');
            heading_4.innerHTML = 'Amount';
            let heading_5 = document.createElement('th');
            heading_5.innerHTML = 'Status';

            row_heading.appendChild(heading_1);
            row_heading.appendChild(heading_2);
            row_heading.appendChild(heading_3);
            row_heading.appendChild(heading_4);
            row_heading.appendChild(heading_5);
            thead.appendChild(row_heading);

            payments.forEach((payment) => {
                if (payment.user_id !== payment.event_creator_id) {
                    let status = '';

                    if (!payment.paid_status) {
                        status = 'UNPAID';
                    } else if (
                        payment.paid_status &&
                        !payment.received_status
                    ) {
                        status = 'PAYMENT PENDING';
                    } else {
                        status = 'PAID - CONFIRMED';
                    }

                    if (!payment.received_status) {
                        let row = document.createElement('tr');
                        let row_data_1 = document.createElement('td');
                        row_data_1.innerHTML = `${payment.event_name}`;
                        let row_data_2 = document.createElement('td');
                        row_data_2.innerHTML = `${payment.username}`;
                        let row_data_3 = document.createElement('td');
                        row_data_3.innerHTML = `${moment(
                            payment.due_date
                        ).format('D MMMM YYYY')}`;
                        let row_data_4 = document.createElement('td');
                        row_data_4.innerHTML = `$ ${payment.amount}`;
                        let row_data_5 = document.createElement('td');

                        const selectListOwed = document.createElement('select');
                        selectListOwed.classList.add('selectPaymentOwed');
                        selectListOwed.classList.add('form-select');
                        selectListOwed.setAttribute(
                            'identifier',
                            payment.payments_id
                        );

                        if (payment.paid_status) {
                            row_data_5.appendChild(selectListOwed);
                        } else {
                            row_data_5.innerHTML = `<p>${status}</p>`;
                        }

                        let optionOne = document.createElement('option');
                        let optionTwo = document.createElement('option');
                        optionOne.value = 'PAYMENT PENDING';
                        optionOne.text = 'PAYMENT PENDING';
                        optionTwo.value = 'PAID - CONFIRMED';
                        optionTwo.text = 'PAID - CONFIRMED';

                        if (status.includes('PAYMENT')) {
                            selectListOwed.add(optionOne, null);
                            selectListOwed.add(optionTwo, null);
                        } else {
                            selectListOwed.add(optionTwo, null);
                            selectListOwed.add(optionOne, null);
                        }

                        row.appendChild(row_data_1);
                        row.appendChild(row_data_2);
                        row.appendChild(row_data_3);
                        row.appendChild(row_data_4);
                        row.appendChild(row_data_5);
                        tbody.appendChild(row);
                    }
                }
            });

            setTimeout(() => {
                addSelectListenersForOwed(session);
            }, 1000);
        })
        .catch((error) => {
            clearErrors();
            const displayError = document.querySelector('#displayError');
            displayError.innerText = error.response.data.message;
        });
}
