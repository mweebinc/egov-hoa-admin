import React from "react";
import InputFactory from "../../../../components/InputFactory";
import {Switch} from "nq-component";

const options = ['CardCount'];


function AddWidget({collections, onSubmit, onCancel}) {
    const [isAdvanced, setAdvanced] = React.useState(false);
    const [object, setObject] = React.useState();

    function onChange(field, value) {
        setObject(state => ({...state, [field]: value}));
    }

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(object);
    }

    function onChangeObject(object) {
        setObject(object);
    }

    return (
        <div className="p-3 pb-4">
            <h4 className="fw-bold">Add Widget</h4>
            <div className="bg-light p-2">
                <div className="d-flex justify-content-between">
                    <label>OBJECT</label>
                    <Switch onChange={setAdvanced} id="dashboard-advance" label="Advanced"/>
                </div>
            </div>
            <form className="mt-3" onSubmit={_onSubmit}>
                <div className="row g-3">
                    {
                        isAdvanced
                            ?
                            <div className="col-md-12">
                                <InputFactory
                                    type="Object"
                                    field="object"
                                    object={{object: object}}
                                    onChange={onChangeObject}
                                    rows="10"
                                />
                            </div>
                            :
                            <>
                                <div className="col-md-12">
                                    <label className="form-label fs-sm">Widget type</label>
                                    <InputFactory
                                        object={object}
                                        type="Enum"
                                        options={options}
                                        onChange={onChange.bind(this, "type")}
                                        field="type"
                                        className="form-control"
                                        required/>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label fs-sm">Target Collection</label>
                                    <InputFactory
                                        object={object}
                                        type="Enum"
                                        options={collections.filter(c => c !== 'dashboard')}
                                        onChange={onChange.bind(this, "collection")}
                                        field="collection"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label fs-sm">Icon</label>
                                    <InputFactory
                                        object={object}
                                        type="Icon"
                                        field="icon"
                                        className="form-control"
                                        onChange={onChange.bind(this, "icon")}
                                        required
                                    />
                                </div>
                            </>
                    }
                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary fs-sm">
                            <i className="bi bi-file-earmark-check me-2"></i>ADD WIDGET
                        </button>
                        <button
                            type="button"
                            className="btn btn-light btn-sm fs-sm ms-2"
                            onClick={onCancel}>CANCEL
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddWidget;
