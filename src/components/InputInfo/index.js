import React from "react";
import {OutputFactory} from "nq-component";
import InputFactory from "../InputFactory";

const defaultProps = {
    type: "String",
    edit: true,
    hidden: false,
}

function InputInfo({onChange, field, object, onSubmit, icon, label, placeholder, edit, hidden, ...props}) {
    const [isEdit, setEdit] = React.useState(false);
    const value = object[field];

    function _onSubmit(e) {
        e.preventDefault();
        setEdit(false);
        onSubmit(e);
    }

    function onclickCancel() {
        setEdit(false);
    }

    if (isEdit) {
        return (
            <>
                <li className="list-group-item text-nowrap text-truncate">
                    <form onSubmit={_onSubmit}>
                        <label className="form-label fs-sm">
                            <i className={icon}></i>
                            <span className="ms-2 fw-light text-capitalize">{label}</span>
                        </label>

                        <div className="mt-1">
                            <InputFactory
                                field={field}
                                object={object}
                                onChange={onChange}
                                placeholder={placeholder}
                                {...props}
                            />
                            <div className="my-3 text-end">
                                {edit && <button className="btn btn-primary fs-xs">SAVE</button>}
                                <button onClick={onclickCancel} className="btn btn-light fs-xs ms-2">CANCEL
                                </button>
                            </div>
                        </div>
                    </form>
                </li>
            </>
        )
    }
    const editLabel = value ? 'Edit' : 'Add';
    const actionLabel = hidden ? 'Show' : editLabel;
    return (
        <>
            <li className="list-group-item clamp">
                <i className={icon}></i>
                <span className="ms-2 me-1 fw-light text-capitalize">{label}</span>
                {
                    (edit || hidden) && (<button
                        onClick={() => setEdit(true)}
                        className="btn btn-link p-0 fs-sm float-end">{actionLabel}</button>)
                }
                <span
                    className="fs-sm text-nowrap">
                        {!hidden && <OutputFactory
                            field={field}
                            object={object}
                            {...props}/>}
                    {hidden && "*** *** ***"}
                </span>
            </li>
        </>
    )
}

InputInfo.defaultProps = defaultProps;
export default InputInfo;
