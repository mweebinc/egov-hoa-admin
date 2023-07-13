import BaseFormPresenter from "../../base/BaseFormPresenter";

class AccountPresenter extends BaseFormPresenter {
    constructor(view, getObjectUseCase, upsertUseCase, signInUseCase) {
        super(view, getObjectUseCase, upsertUseCase);
        this.signInUseCase = signInUseCase;
        this.password = {};
    }

    onChangePassword(value, field) {
        this.password[field] = value;
    }

    async onChangePicture(value) {
        this.change['picture'] = value;
        await this.submit();
        this.view.reload();
    }

    async onSubmitPassword() {
        const {oldPassword, newPassword, confirmNewPassword} = this.password;
        if (newPassword !== confirmNewPassword) {
            this.view.showError('Password must be the same');
            return;
        }
        try {
            const user = this.object;
            await this.signInUseCase.execute({
                    username: user.username,
                    password: oldPassword
                },
                {token: false}
            );
        } catch (error) {
            if (error.code === 404) {
                this.view.showError("Invalid old password");
                return;
            }
            this.view.showError(error);
        }
    }
}

export default AccountPresenter;
