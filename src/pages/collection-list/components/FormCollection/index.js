import React from 'react';
import InputFactory from "../../../../components/InputFactory";
import {Switch} from "nq-component";

function FormCollection({schema, onSubmit, onCancel}) {
    const [isAdvanced, setAdvanced] = React.useState(false);
    const [_schema, setSchema] = React.useState({...schema});

    function onChange(value,field) {
        setSchema(s => ({...s, [field]: value}));
    }

    function onChangeSchema(schema) {
        setSchema(schema);
    }

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(_schema);
    }

    return (
        <>
            <div className="p-3 pb-4">
                <h4 className="fw-bold">{schema.collection ? "Edit" : "Add"} Collection</h4>
                <div className="bg-light p-2">
                    <div className="d-flex justify-content-between">
                        <label>SCHEMA</label>
                        <Switch onChange={setAdvanced} id="schema-advance" label="Advanced"/>
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
                                        field="schema"
                                        object={{schema: _schema}}
                                        onChange={onChangeSchema}
                                        rows="10"
                                    />
                                </div>
                                :
                                <>
                                    <div className="col-md-12">
                                        <label className="form-label">Collection Name</label>
                                        <InputFactory
                                            onChange={onChange}
                                            type="String"
                                            field="collection"
                                            placeholder="Give it a good name"
                                            required
                                            disabled={schema.collection}
                                            object={_schema}/>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Description</label>
                                        <InputFactory
                                            onChange={onChange.bind(this, "description")}
                                            type="String"
                                            field="description"
                                            placeholder="A short description"
                                            object={_schema}/>
                                    </div>
                                </>
                        }
                        <div className="col-md-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm">
                                <i className="bi bi-file-earmark-check me-2"></i>SAVE
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-3"
                                onClick={onCancel}>CANCEL
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormCollection;
