import BaseListPresenter from "../../base/BaseListPresenter";

class PaymentListPresenter extends BaseListPresenter {
    constructor(view, findObjectUseCase, deleteObjectUseCase, upsertUseCase) {
        super(view, findObjectUseCase, deleteObjectUseCase);
        this.upsertUseCase = upsertUseCase;
    }

    onClickReject(index) {
        this.changeStatus(index, "REJECTED");
    }

    onClickApprove(index) {
        this.changeStatus(index, "COMPLETED");
    }

    async changeStatus(index, status) {
        const object = this.objects[index];
        const collection = this.view.getCollectionName();
        const change = {id: object.id, status: status};
        try {
            const object = await this.upsertUseCase.execute(collection, change);
            this.objects[index] = object;
            this.view.setObjects(this.objects);
            this.view.showSuccess("Successfully saved!");
        } catch (error) {
            this.view.showError(error);
        }
    }
}

export default PaymentListPresenter;
