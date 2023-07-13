import React from "react";
import CollectionFormPresenter from "./CollectionFormPresenter";
import {getObjectUseCase, upsertUseCase} from '../../usecases/object';
import withRouter from "../../withRouter";
import BaseFormPage from "../../base/BaseFormPage";
import NavBar from "../../components/navbar";
import FormFactory from "../../components/FormFactory";

class CollectionFormPage extends BaseFormPage {
    constructor(props) {
        super(props);
        this.state = {object: {}};
        this.presenter = new CollectionFormPresenter(this, getObjectUseCase(), upsertUseCase());
    }

    render() {
        const object = this.state.object;
        const schema = this.getSchema(this.getCollectionName());
        if (!schema) return <h1>no schema</h1>;
        const label = this.getObjectId() === undefined ? "Add New " : "Edit ";
        return (
            <>
                <NavBar/>
                <div className="overflow-auto">
                    <div className="h-100">
                        <div className="p-3 p-lg-4">
                            <h1 className="fw-bold mt-3 text-capitalize">{label + (schema.label || this.getCollectionName())}</h1>
                            <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                                <form onSubmit={this.onSubmitForm.bind(this)}>
                                    <FormFactory
                                        schema={schema}
                                        object={object}
                                        onChange={this.onChange.bind(this)}/>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary fs-sm me-3">
                                            <i className="bi bi-file-earmark-check me-2"></i>SAVE
                                        </button>
                                        <button type="button" className="btn btn-light fs-sm"
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

export default withRouter(CollectionFormPage);
