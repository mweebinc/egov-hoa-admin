import React from "react";
import InputFactory from "../../components/InputFactory";
import getValue from "../../getValue";

function PasswordForm({fields, object, icon, onSave}) {
    const [isEdit, setEdit] = React.useState(false);
    const temp = React.useMemo(() => Object.assign({}, object), [object]);

    function onSubmit(e) {
        e.preventDefault();
        setEdit(false);
        Object.keys(fields).forEach(field => {
            object[field] = temp[field];
            delete temp[field];
        });
        onSave();
    }

    function cancelClick() {
        Object.keys(fields).forEach(field => {
            temp[field] = object[field];
        });
        setEdit(false);
    }

    if (isEdit) {
        return (
            <li className="list-group-item text-nowrap text-truncate">
                <form onSubmit={onSubmit}>
                    {

                        Object.keys(fields).map((field) => {
                            const {type, label, icon, ...options} = fields[field];
                            return (
                                <>
                                    <label className="form-label fs-sm mt-3">
                                        <i className={icon}></i>
                                        <span className="ms-2 fw-light">{label}</span>
                                    </label>
                                    <InputFactory
                                        field={field}
                                        type={getValue(type, type, 'String')}
                                        object={temp}
                                        {...options}
                                    />
                                </>
                            )
                        })
                    }
                    <div className="my-3 text-end">
                        <button className="btn btn-primary fs-xs">SAVE</button>
                        <button onClick={cancelClick} className="btn btn-light fs-xs ms-2">CANCEL
                        </button>
                    </div>
                </form>
            </li>
        )
    }
    return (
        <li className="list-group-item text-nowrap text-truncate">
            <i className="bi bi-key"></i>
            <span className="ms-2 fw-light">Password: </span>
            <span className="fs-sm">**********</span>
            <button onClick={() => setEdit(true)} className="btn btn-link p-0 float-end fs-sm">Change</button>
        </li>
    )
}

export default PasswordForm;
