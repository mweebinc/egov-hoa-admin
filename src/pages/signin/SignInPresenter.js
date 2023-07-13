class SignInPresenter {
    constructor(view, signInUseCase) {
        this.view = view;
        this.signInUseCase = signInUseCase;
        this.change = {};
    }

    onChange(value, field) {
        this.change[field] = value;
    }

    submit() {
        const masterKey = this.view.getMasterKey();
        const user = {
            ...this.change,
            masterKey
        }
        this.view.showProgress();
        Promise.resolve()
            .then(() => this.signInUseCase.execute(user))
            .then((user) => {
                this.view.navigateTo('/');
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }
}

export default SignInPresenter;
