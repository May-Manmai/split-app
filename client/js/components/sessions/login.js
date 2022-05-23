function renderLoginForm() {
    const page = document.getElementById('page');
    page.innerHTML = `
    <div id="both_containers">
    <div class="container px-4 py-5 mx-auto">
    <div class="card card0">
        <div class="d-flex flex-lg-row flex-column-reverse">
            <div class="card card1">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-10 my-5">
                        <div class="row justify-content-center px-3 mb-3">
                            <img
                                id="logo"
                                src="../../split-logo.png"
                            />
                        </div>
                        <h3 class="mb-5 text-center heading">Split with us</h3>
                        <h6 class="msg-info">Please login to your account</h6>
                        <p style="text-align: center; color: red" id="displayError"></p>
                        <form id="login" action="/api/sessions" method="POST">
                        <div class="form-group">
                            <label class="form-control-label text-muted"
                                >Email</label
                            >
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                class="form-control"
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label text-muted"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="psw"
                                name="password"
                                placeholder="Password"
                                class="form-control"
                            />
                        </div>
                        <div class="row justify-content-center my-3 px-3">
                            <button class="btn-block btn-color">
                                Login to Split
                            </button>
                        </div>
                     </form>
                    </div>
                </div>

                
            </div>
            <div class="card card2">
                <div class="my-auto mx-md-5 px-md-5 right">
                    <h3 class="text-white" style="font-weight: 600">Just Split</h3>
                    <small class="text-white" style="font-size: 1.2em">
                        No more awkward conversations with your mates. The best way to split costs and track payments. </small
                    >
                </div>
                <div class="bottom text-center mb-5">
                    <p href="#" class="sm-text mx-auto mb-3" style="font-weight: 500">
                        Don't have an account?<button id="createNewAccount" 
                            class="btn btn-white ml-2"
                        >
                            Create new
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    document
        .querySelector('#createNewAccount')
        .addEventListener('click', () => {
            renderSignupForm();
        });
    const form = document.getElementById('login');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailField = document.querySelector('input[name=email]');
        const passwordField = document.querySelector('input[name=password]');
        const body = {
            email: emailField.value,
            password: passwordField.value,
        };

        let error = null;
        if (body.email === '') {
            error = 'Email is required';
        } else if (body.password === '') {
            error = 'Password is required';
        }

        const displayError = document.querySelector('#displayError');

        if (!error) {
            axios
                .post('/api/sessions', body)
                .then((response) => {
                    renderAppWithSession();
                })
                .catch((error) => {
                    displayError.innerText = error.response.data.message;
                    clearErrors();
                });
        } else {
            displayError.innerText = error;
            clearErrors();
        }
    });
}
