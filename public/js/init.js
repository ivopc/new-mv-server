const ERRORS = {
    INPUT_LENGTH: 0,
    INVALID_USER_PASSWORD: 1
};

class App {
    constructor () {
        this.setLoginListener();
        //this.setRegisterListener();
    }

    setLoginListener () {
        document.querySelector("#loginform").addEventListener("submit", event => this.onLoginSubmit(event));
    }

    async onLoginSubmit(event) {
        event.preventDefault();
        const el = event.target;
        const formData = new FormData(el);
        // const isInputValid = this.validateLoginInputs(formData.get("username"), formData.get("password"));
        // if (!isInputValid) {
        //     INVALID_USER_PASSWORD
        //     return;
        // };
        try {
            const loginData = await axios.post(el.getAttribute("action"), {
                username: formData.get("username"),
                password: formData.get("password")
            });
            this.onLoginSuccess(loginData);
        } catch (err) {
            console.log("ihhh deu erro", err.message);
            this.onLoginError(ERRORS.INVALID_USER_PASSWORD);
        }
    }

    onLoginSuccess (data) {
        console.log("Logado com sucessso", data);
    }

    onLoginError(err) {
        console.log("Deu algum erro crl");

        switch (err) {
            case ERRORS.INVALID_USER_PASSWORD: 
            case ERRORS.INPUT_LENGTH:
            {
                console.log("Usuário ou senha inválidos");
                break;
            };
        };
    }

    setLoginLoader () {
        
    }

};

function init() {
    new App();
};

document.addEventListener("DOMContentLoaded", init);