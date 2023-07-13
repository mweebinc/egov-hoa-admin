import changes from '../../changes';

class AccountPresenter {
    constructor(view, findInformation, saveFileUseCase, saveObjectUseCase, updateObjectUseCase, updateUserUseCase) {
        this.view = view;
        this.findInformation = findInformation;
        this.saveFileUseCase = saveFileUseCase;
        this.saveObjectUseCase = saveObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.updateUserUseCase = updateUserUseCase;
    }

    componentDidMount() {
        this.initUser();
    }

    initInformation() {
        const className = "users.information";
        const user = this.view.getCurrentUser();
        const query = {where: {user: {id: user.id}}};
        this.findInformation
            .execute(className, query)
            .then(([information]) => {
                this.view.hideProgress();
                if (information) {
                    this.information = information;
                    this.view.setInformation(Object.assign({}, information));
                } else {
                    const info = {user};
                    this.information = {};
                    this.view.setInformation(info);
                }
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    initUser() {
        const user = this.view.getCurrentUser();
        this.user = user;
        this.view.setProfile(user.profile);
        this.view.setUser(Object.assign({}, user));
    }

    saveUserClick() {
        const user = this.view.getUser();
        this.updateUser(user);
    }

    savePasswordClick() {
        const user = this.view.getUser();
        const {newPassword, confirmNewPassword} = user;
        delete user['newPassword'];
        delete user['confirmNewPassword'];
        if (newPassword !== confirmNewPassword) {
            this.view.showError('password must be the same');
            return;
        }
        user['password'] = newPassword;
        this.updateUser(user);
    }

    saveInformationClick() {
        const className = "users.information";
        const information = this.view.getInformation();
        this.view.showProgress();
        if (information.id) {
            const change = changes(this.information, information);
            change.id = this.information.id;
            this.updateObjectUseCase.execute(className, change)
                .then(() => {
                    this.view.hideProgress();
                    this.view.showSuccessSnackbar("Successfully saved!");
                })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        } else {
            this.saveObjectUseCase.execute(className, information)
                .then(() => {
                    this.view.hideProgress();
                    this.view.showSuccessSnackbar("Successfully saved!");
                })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        }


    }

    updateUser(user) {
        const change = changes(this.user, user);
        change.id = this.user.id;
        this.view.showProgress();
        this.updateUserUseCase.execute('users', change)
            .then((user) => {
                console.log(user);
                this.view.hideProgress();
                this.user = user;
                this.view.setCurrentUser(user);
                this.view.showSuccessSnackbar("Successfully saved!");
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    changeProfileClick(file) {
        this.view.showImageCropper(file);
    }

    onCrop(file) {
        this.saveFileUseCase.execute(file)
            .then((response) => {
                const url = response.url;
                const user = {profile: url};
                this.updateUser(user);
            });
    }
}

// export default AccountPresenter;
export default AccountPresenter;
