import BaseFormPresenter from "../../base/BaseFormPresenter";

class HoaFormPresenter extends BaseFormPresenter {
    async getObject() {
        const collection = this.view.getCollectionName();
        const id = this.view.getObjectId();
        if (id) {
            const params = {include: ["all"]};
            try {
                this.view.showProgress();
                const object = await this.getObjectUseCase.execute(collection, id, {
                    params,
                });
                this.view.hideProgress();
                this.view.setObject(object);
            } catch (error) {
                this.view.hideProgress();
                this.view.showError(error);
            }
        } else {
            const user = this.view.getCurrentUser();
            this.object['first_name'] = user.first_name;
            this.object['last_name'] = user.last_name;
            this.object['mobile'] = user.mobile;
            this.object['email'] = user.email;
            this.change = this.object;
            this.view.setObject(this.object);
        }
    }

    async save() {
        const collection = this.view.getCollectionName();
        const object = this.view.getObject();
        const user = this.view.getCurrentUser();
        if (object.id) {
            this.change.id = object.id;
        } else {
            this.change.acl = this.view.getAcl();
        }
        try {
            const profile = await this.upsertUseCase.execute(collection, this.change);
            await this.upsertUseCase.execute("users", {
                id: user.id,
                profile: {id: profile.id},
            });
        } catch (error) {
            throw error; // rethrow the error to be caught by the caller
        }
    }

    async submit() {
        try {
            this.view.submitting();
            await this.save();
            this.view.submissionSuccess();
            this.view.showSuccessSnackbar("Successfully saved!");
        } catch (error) {
            this.view.submissionError(error);
            this.view.showError(error);
        }
    }
}

export default HoaFormPresenter;
