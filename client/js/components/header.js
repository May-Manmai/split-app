function renderHeader() {
    const header = document.querySelector('#header-nav');
    const session = getSession();

    if (session.email) {
        header.innerHTML = `       
        <div class="w-100 border fixed-top py-2">
            <a
                class="btn float-start d-inline offcanvas_btn"
                href="#"
                role="button"
                aria-controls="sidebar_left"
            >
                <img 
                    src="../../split-logo.png"
                    class="main-page img-fluid hlogo rounded"
                    width="50"
                />PLIT
            
            <a class="btn float-end d-inline offcanvas_btn" href="#sidebar_left" role="button" aria-controls="sidebar_left">
                <i id="menu_button" class="material-icons" style="font-size:40px;color:black" data-bs-target="#sidebar_left"
                    data-bs-toggle="offcanvas"
                    class="img-fluid hlogo rounded"
                    width="50">menu</i>
            </a>
            
            <div class="clearfix"></div>
        </div>
        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="sidebar_left"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel" style="font-weight: 550">
                    SPLIT APP
                </h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div>Hello <span style="font-weight: bold; color: #d500f9">${session.username}</span>!</div>
                <ul id="navlist" class="nav flex-column">
                    <li id="main-page-from-offcanvas" class="nav-item">
                        <a class="nav-link active" href="#">Home</a>
                    </li>
                    <li id="payment-event" class="nav-item">
                        <a class="nav-link" href="#">Create Payment Event</a>
                    </li>
                    <li onClick="logout()" class="nav-item">
                        <a class="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="test login"></div>

    `;
        document
            .querySelector('#payment-event')
            .addEventListener('click', () => {
                renderCreatePaymentEventList(session);
            });
        document.querySelector('.main-page').addEventListener('click', () => {
            mainPageElement(session);
        });
        document
            .querySelector('#main-page-from-offcanvas')
            .addEventListener('click', () => {
                mainPageElement(session);
            });
    } else {
        header.innerHTML = `       
         <div class="w-100 border fixed-top py-2">
            <a
                class="btn float-start d-inline offcanvas_btn"
                href="#"
                role="button"
                aria-controls="sidebar_left"
            >
                 <img 
                    src="https://static.thenounproject.com/png/180195-200.png"
                    class="main-page img-fluid hlogo rounded"
                    width="50"
                />PLIT
            </a>
           <a class="btn float-end d-inline offcanvas_btn" href="#sidebar_left" role="button" aria-controls="sidebar_left">
                <i id="menu_button" class="material-icons" style="font-size:40px;color:black" data-bs-target="#sidebar_left"
                    data-bs-toggle="offcanvas"
                    class="img-fluid hlogo rounded"
                    width="50">menu</i>
            </a>
            <div class="clearfix"></div>
        </div>
        
        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="sidebar_left"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel" style="font-weight: 550">
            SPLIT APP</h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div>Split is awesome.</div>
                <ul id="navlist" class="nav flex-column">
                     <li onClick="renderSignupForm()" class="nav-item">
                        <a class="nav-link" href="#">Sign Up</a>
                    </li>
                    <li onClick="renderLoginForm()" class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="test login"></div>

    `;
    }
}
// nav bar list and functions need to be updated
