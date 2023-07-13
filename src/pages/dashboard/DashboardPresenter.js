import BaseListPresenter from "../../base/BaseListPresenter";

class DashboardPresenter extends BaseListPresenter {
    constructor(view, findObjectUseCase, deleteObjectUseCase, upsertUseCase,updateSchemaUseCase) {
        super(view, findObjectUseCase, deleteObjectUseCase);
        this.upsertUseCase = upsertUseCase;
        this.updateSchemaUseCase = updateSchemaUseCase;
    }

    componentDidMount() {
        this.init();
        this.sort = {createdAt: 1}
        this.getObjects();
    }

    async onSubmitAddWidget(obj) {
        try {
            this.view.submitting();
            const object = await this.upsertUseCase.execute('dashboard', obj);
            this.objects.push(object);
            this.view.setObjects(this.objects);
            this.view.submissionSuccess();
        } catch (error) {
            this.view.showError(error);
        }
    }

    async onSubmitDelete(index) {
        try {
            this.view.submitting();
            const object = this.objects[index];
            await this.deleteObjectUseCase.execute('dashboard', object.id);
            this.objects.splice(index, 1);
            this.view.setObjects(this.objects);
            this.view.submissionSuccess();
        } catch (error) {
            this.view.showError(error);
        }
    }
    onSubmitEditCollection(schema) {
        this.view.closeDialog();
        this.updateSchemaUseCase.execute(schema)
            .then(schema => {
                const schemas = this.view.getSchemas();
                const index = schemas.findIndex((s) => s.collection === schema.collection);
                schemas[index] = schema;
                this.view.setSchemas(schemas);
            })
            .catch(error => {
                this.view.showError(error);
            });
    }
}

export default DashboardPresenter;