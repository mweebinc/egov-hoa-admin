import React from "react";
import InputFactory from "../../../../components/InputFactory";

// default field
const options = ['id', 'createdAt', 'updatedAt', 'acl', 'username', 'password', 'email'];

function DeleteField({onSubmit, onCancel, fields}) {
    const [field, setField] = React.useState();

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(field);
    }

    return (
        <>
            <div className="p-3 pb-4">
                <h4 className="fw-bold">Delete Field</h4>
                <form onSubmit={_onSubmit}>
                    <div>
                        <label className="form-label">Which field</label>
                        <InputFactory
                            type="Enum"
                            label="Select field"
                            options={fields.filter(f => !options.includes(f))}
                            required
                            onChange={setField}/>
                    </div>
                    <div className="mt-3 text-end">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={onCancel}>CANCEL
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-danger btn-sm ms-3">
                            <i className="bi bi-trash me-2"></i>YES, DELETE
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default DeleteField;
