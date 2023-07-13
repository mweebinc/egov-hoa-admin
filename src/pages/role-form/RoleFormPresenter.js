import BaseFormPresenter from "../../base/BaseFormPresenter";

class RoleFormPresenter extends BaseFormPresenter {
    constructor(view, getObjectUseCase, upsertUseCase, updateSchemaUseCase) {
        super(view, getObjectUseCase, upsertUseCase);
        this.updateSchemaUseCase = updateSchemaUseCase;
        this.schemaChange = {};
    }

    onChangePermission(schema, key, checked) {
        const accessId = this.view.getPermissionId().toLowerCase();
        const collection = schema.collection;
        this.schemaChange[collection] = this.schemaChange[collection] || {permissions: schema.permissions};
        const permissions = this.schemaChange[collection].permissions;
        permissions[key] = permissions[key] || [];
        if (checked) {
            permissions[key].push(accessId);
        } else {
            const index = permissions[key].indexOf(accessId);
            permissions[key].splice(index, 1);
        }
    }

    async updateSchema() {
        const schemas = this.view.getSchemas();
        const promises = Object.keys(this.schemaChange)
            .map(collection => {
                const schema = schemas.find(s => s.collection === collection);
                schema.permissions = this.schemaChange[collection].permissions;
                return this.updateSchemaUseCase.execute(schema);
            })
        try {
            await Promise.all(promises);
            this.view.setSchemas(schemas);
        } catch (error) {
            throw error; // rethrow the error to be caught by the caller
        }
    }

    async submit() {
        try {
            this.view.submitting();
            if (Object.values(this.change).length > 0) {
                await super.save();
            }
            if (Object.values(this.schemaChange).length > 0) {
                await this.updateSchema();
            }
            this.view.submissionSuccess();
            this.view.showSuccessSnackbar("Successfully saved!");
            this.view.navigateBack();
        } catch (error) {
            this.view.submissionError(error);
            this.view.showError(error);
        }
    }

}

export default RoleFormPresenter;
