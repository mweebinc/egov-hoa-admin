import {Table} from "nq-component";
import {Checkbox} from "nq-component";
import {NavBar} from "nq-component";
import {Progress} from "nq-component";
import {Button} from "nq-component";
import RoleFormPresenter from "./RoleFormPresenter";
import {getObjectUseCase, upsertUseCase} from "../../usecases/object";
import {updateSchemaUseCase} from "../../usecases/schema/usecases";
import withRouter from "../../withRouter";
import React from "react";
import BaseFormPage from "../../base/BaseFormPage";
import InputFactory from "../../components/InputFactory";


const permissionKeys = ['modify', 'create', 'get', 'find', 'update', 'delete'];

class RoleFormPage extends BaseFormPage {
    constructor(props) {
        super(props);
        this.state = {object: {}};
        this.presenter = new RoleFormPresenter(this, getObjectUseCase(), upsertUseCase(), updateSchemaUseCase());
    }

    onChangePermission(schema, key, checked) {
        this.presenter.onChangePermission(schema, key, checked);
    }

    getPermissionId() {
        return 'role:' + this.state.object.name;
    }

    getCollectionName() {
        return "roles";
    }

    getKeys() {
        return permissionKeys;
    }

    render() {
        const progress = this.state.progress;
        const object = this.state.object;
        const user = this.getCurrentUser();
        const schemas = this.getSchemas();
        const fields = {
            Collections: {
                type: "String"
            }
        };
        const objects = schemas.map(s => {
            return {
                id: s.collection,
                Collections: s.collection,
                schema: s,
            };
        })
        return (
            <>
                <NavBar
                    className="shadow-sm"
                    title="DASHBOARD"
                />
                <div className="overflow-auto">
                    <div className="p-3 p-lg-4">
                        <h1 className="fw-bold mt-3 text-capitalize">{this.getCollectionName()}</h1>
                        <div className="shadow-sm rounded bg-white">
                            <div className="p-3 px-lg-5 py-lg-4">
                                <form onSubmit={this.onSubmitForm.bind(this)}>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fs-sm">Role Name</label>
                                        <InputFactory
                                            object={object}
                                            onChange={this.onChange.bind(this)}
                                            type="String"
                                            field="name"
                                        />
                                    </div>
                                    <Table
                                        progress={this.state.progress}
                                        fields={fields}
                                        objects={objects}
                                        onCollapse={({schema}) => {
                                            const collection = schema.collection;
                                            const permissions = schema.permissions;
                                            if (progress) return <Progress/>
                                            return (
                                                <div className="row">
                                                    {
                                                        permissionKeys.map(key => {
                                                            const id = this.getPermissionId().toLowerCase();
                                                            const access = permissions[key] || [];
                                                            const check = access.includes(id);
                                                            if (!user.isMaster && key === 'modify') return null;
                                                            const _key = `${collection}-${key}`;
                                                            return (
                                                                <div
                                                                    key={_key}
                                                                    className="col-6">
                                                                    <Checkbox
                                                                        defaultChecked={check}
                                                                        onChange={this.onChangePermission.bind(this, schema, key)}
                                                                        id={_key}
                                                                        label={key}
                                                                        className="text-capitalize"
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }}
                                    />
                                    <div className="mt-3">
                                        <Button
                                            progress={this.state.submitting}
                                            type="submit"
                                            className="btn btn-primary fs-sm me-3">
                                            <i className="bi bi-file-earmark-check me-2"></i>SAVE
                                        </Button>
                                        <button
                                            type="button" className="btn btn-light fs-sm"
                                            onClick={this.onClickBack.bind(this)}>GO BACK
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(RoleFormPage);
