function renderSignupForm() {
    const page = document.getElementById('page');
    page.innerHTML = `
        <div id="both_containers">
        <div class="container px-4 py-5 mx-auto">
            <div class="card card0">
                <div class="d-flex flex-lg-row flex-column-reverse">
                    <div class="card card2">
                        <div class="my-auto mx-md-5 px-md-5 right">
                        <h3 class="text-white" style="font-weight: 600">Just Split</h3>
                        <small class="text-white" style="font-size: 1.2em">
                            No more awkward conversations with your mates. The best way to split costs and track payments. </small
                        >
                        </div>
                        <div class="bottom text-center mb-5">
                            <p href="#" class="sm-text mx-auto mb-3" style="font-weight: 500">
                                Already have an account?  <button
                                    id="login_button"
                                    class="btn btn-white ml-2"
                                >
                                    Login to Split
                                </button>
                            </p>
                        </div>
                    </div>
                    <div class="card card1">
                        <div class="row justify-content-center my-auto">
                            <div class="col-md-8 col-10 my-5">
                                <div
                                    class="row justify-content-center px-3 mb-3"
                                >
                                    <img
                                        id="logo"
                                        src="../../split-logo.png"
                                    />
                                </div>
                                <h3 class="mb-5 text-center heading">
                                    Split with us
                                </h3>
                                <h6 class="msg-info">
                                    Sign up to Split. You know you want to.
                                </h6>
                                <p style="text-align: center; color: red" id="displayError"></p>
                                <form
                                    id="signup"
                                    action="/api/sessions"
                                    method="POST"
                                >
                                    <div class="form-group">
                                        <label
                                            class="form-control-label text-muted"
                                            >Name:</label
                                        >
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            class="form-control"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label
                                            class="form-control-label text-muted"
                                            >Username:</label
                                        >
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            class="form-control"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label
                                            class="form-control-label text-muted"
                                            >Email:</label
                                        >
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            class="form-control"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label
                                            class="form-control-label text-muted"
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
                                    <div
                                        class="row justify-content-center my-3 px-3"
                                    >
                                        <button
                                            id="signUpbutton"
                                            class="btn-block btn-color"
                                            type="submit"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `;
    document.querySelector('#login_button').addEventListener('click', () => {
        renderLoginForm();
    });

    const form = document.getElementById('signup');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameField = document.querySelector('input[name=first_name]');
        const usernameField = document.querySelector('input[name=username]');
        const passwordField = document.querySelector('input[name=password]');
        const emailField = document.querySelector('input[name=email]');

        const body = {
            first_name: nameField.value,
            username: usernameField.value,
            password: passwordField.value,
            email: emailField.value,
        };

        let error = null;
        if (body.first_name === '') {
            error = 'Name is required';
        } else if (body.username === '') {
            error = 'Username is required';
        } else if (body.password === '') {
            error = 'Password is required';
        } else if (body.email === '') {
            error = 'Email is required';
        }

        const displayError = document.querySelector('#displayError');

        if (!error) {
            axios
                .post('/api/users', body)
                .then((response) => {
                    renderLoginForm(); // TODO change to auto login
                })
                .catch((error) => {
                    clearErrors();
                    displayError.innerText = error.response.data.message;
                });
        } else {
            clearErrors();
            displayError.innerText = error;
        }
    });
}
