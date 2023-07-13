import React from "react";
import {InputString} from "nq-component";
import {Switch} from "nq-component";
import OptionType from "./OptionType";
import InputFactory from "../../../../components/InputFactory";

const options = ['String', 'Number', 'Pointer', 'Relation', 'Date', 'Boolean', 'Object', 'Array', 'Image', 'File'];


function AddField({schema, onSubmit, onCancel, collections}) {
    const [name, setName] = React.useState({});
    const [type, setType] = React.useState(options[0]);
    const [option, setOptions] = React.useState({});

    function onChangeOptions(option) {
        setOptions(s => ({...s, ...option}));
    }

    function customType(field, type) {
        switch (type) {
            case 'Image':
            case 'File':
                field["type"] = 'String';
                field["_type"] = type;
                break;
            default:
                field["type"] = type;
        }
    }

    function _onSubmit(e) {
        e.preventDefault();
        const _schema = {...schema};
        _schema.fields[name] = _schema.fields[name] || {};
        _schema.fields[name] = {..._schema.fields[name], ...option};
        customType(_schema.fields[name], type);
        onSubmit(_schema);
    }

    function onChangeName(value) {
        setName(value);
    }

    function onChangeType(value) {
        setType(value);
    }

    return (
        <>
            <div className="p-3 pb-4">
                <h4 className="fw-bold">Add Field</h4>
                <form onSubmit={_onSubmit}>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label fs-sm">Field name</label>
                            <InputString
                                className="form-control"
                                placeholder="Give it a good name"
                                onChange={onChangeName}
                                required/>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label fs-sm">Field type</label>
                            <InputFactory
                                type="Enum"
                                options={options}
                                onChange={onChangeType}
                                className="form-control"
                                required/>
                        </div>
                        <OptionType
                            type={type}
                            collections={collections}
                            onChange={setOptions}/>
                        <div className="col-md-12">
                            <div className="d-flex">
                                <Switch
                                    onChange={(value) => onChangeOptions({required: value})}
                                    id="switch-required"
                                    label="Required"/>
                                <Switch
                                    onChange={(value) => onChangeOptions({unique: value})}
                                    id="switch-unique"
                                    label="Unique"
                                    className="ms-3"/>
                            </div>
                        </div>

                        <div className="col-md-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary fs-sm">
                                <i className="bi bi-file-earmark-check me-2"></i>ADD FIELD
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
        </>

    );
}

export default AddField;
