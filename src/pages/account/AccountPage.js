import React from 'react';
import AccountPresenter from "./AccountPresenter";
import {
    getObjectUseCase,
    upsertUseCase
} from "../../usecases/object";
import BaseFormPage from "../../base/BaseFormPage";
import NavBar from "../../components/navbar";
import InputInfo from "../../components/InputInfo";
import fieldsPassword from "./fieldsPassword.json";
import InputInfoMerge from "../../components/InputInfoMerge";
import {signInUseCase} from "../../usecases/user";
import {saveImageUseCase} from "../../usecases/file";
import click from "../../click";
import {InputImage} from "nq-component";

class AccountPage extends BaseFormPage {
    constructor(props) {
        super(props);
        this.state = {object: {}, progress: true};
        this.presenter = new AccountPresenter(this, getObjectUseCase(), upsertUseCase(), signInUseCase());
        this.pictureRef = React.createRef();
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getCollectionName() {
        return "users";
    }

    getObjectId() {
        const user = this.getCurrentUser();
        return user.id;
    }

    onClickProfile() {
        click(this.pictureRef.current);
    }

    onChangePassword(value, field) {
        this.presenter.onChangePassword(value, field);
    }

    onChangePicture(value) {
        this.presenter.onChangePicture(value);
    }

    onSubmitPassword(e) {
        e.preventDefault();
        this.presenter.onSubmitPassword();
    }

    navigateBack() {
        // override the default behavior
    }

    render() {
        const user = this.state.object;
        const progress = this.state.progress;
        const schema = this.getSchema(this.getCollectionName());
        if (!schema) return <h1>no schema</h1>;
        if (progress) return null;
        const name = user.name || user.username;
        const fields = schema.fields;
        return (
            <>
                <NavBar/>
                <div className="overflow-auto">
                    <div className="h-100">
                        <div className="p-3 p-lg-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="bg-white p-3 shadow-sm rounded">
                                        <div className="position-relative">
                                            <button
                                                onClick={this.onClickProfile.bind(this)}
                                                className="btn btn-light bg-white btn-sm text-muted rounded-circle position-absolute shadow-sm"
                                                style={{left: '50%', transform: 'translate(100%, 200%)'}}>
                                                <i className="bi bi-camera"></i>
                                            </button>
                                        </div>
                                        <div className="text-center">
                                            <InputImage
                                                value={user.picture}
                                                name={name}
                                                onChange={this.onChangePicture.bind(this)}
                                                save={saveImageUseCase()}/>
                                            <p className="m-0 fs-sm fw-bold mt-3">{name}</p>
                                        </div>
                                        <hr/>
                                        <span className="text-muted fs-sm">User Information</span>
                                        <ul className="list-group list-group-flush">
                                            {
                                                Object.keys(fields)
                                                    .map(field => {
                                                        const {type, write, ...options} = fields[field];
                                                        if (write === false) return null;
                                                        if (field === 'password') return null;
                                                        if (field === 'picture') return null;
                                                        if (type !== 'String') return null;
                                                        const icon = options.icon || "bi bi-card-checklist";
                                                        return (
                                                            <InputInfo
                                                                key={field}
                                                                icon={icon}
                                                                field={field}
                                                                object={user}
                                                                onChange={this.onChange.bind(this)}
                                                                onSubmit={this.onSubmitForm.bind(this)}
                                                                label={options.label || field + ':'}
                                                                placeholder="fist-name last-name"/>
                                                        )
                                                    })
                                            }
                                            <InputInfoMerge
                                                fields={fieldsPassword}
                                                object={user}
                                                onChange={this.onChangePassword.bind(this)}
                                                onSubmit={this.onSubmitPassword.bind(this)}
                                                label="Password:"
                                            />
                                            <InputInfo
                                                type="Date"
                                                icon="bi bi-link-45deg"
                                                field="createdAt"
                                                object={user}
                                                label="Joined:"
                                                edit={false}
                                            />
                                            <InputInfo
                                                icon="bi bi-link-45deg"
                                                field="id"
                                                object={user}
                                                label="ID:"
                                                edit={false}/>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AccountPage;
