import React from "react";
import InputFactory from "../InputFactory";

function InputInfoMerge({fields, label, onChange, onSubmit}) {
    const [isEdit, setEdit] = React.useState(false);

    function _onSubmit(e) {
        e.preventDefault();
        setEdit(false);
        onSubmit(e);
    }

    function cancelClick() {
        setEdit(false);
    }

    if (isEdit) {
        return (
            <li className="list-group-item text-nowrap text-truncate">
                <form onSubmit={_onSubmit}>
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
                                        type={type}
                                        field={field}
                                        onChange={onChange}
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
            <span className="ms-2 me-1 fw-light">{label}</span>
            <span className="fs-sm">**********</span>
            <button onClick={() => setEdit(true)} className="btn btn-link p-0 float-end fs-sm">Change</button>
        </li>
    )
}

export default InputInfoMerge;
