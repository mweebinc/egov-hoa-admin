import React from "react";
import InputFactory from "../../components/InputFactory";
import {OutputFactory} from "nq-component";

const defaultProps = {
    type: "String",
    edit: true,
}

function InputInfo({field, object, onSave, icon, label, placeholder, edit, ...props}) {
    const [isEdit, setEdit] = React.useState(false);
    const temp = React.useMemo(() => Object.assign({}, object), [object]);
    const value = object[field];

    function onSubmit(e) {
        e.preventDefault();
        setEdit(false);
        object[field] = temp[field];
        onSave();
    }

    function cancelClick() {
        temp[field] = object[field];
        setEdit(false);
    }


    if (isEdit) {
        return (
            <>
                <li className="list-group-item text-nowrap text-truncate">
                    <form onSubmit={onSubmit}>
                        <label className="form-label fs-sm">
                            <i className={icon}></i>
                            <span className="ms-2 fw-light">{label}</span>
                        </label>
                        <div className="mt-1">
                            <InputFactory
                                placeholder={placeholder}
                                field={field}
                                object={temp}
                                {...props}
                            />
                            <div className="my-3 text-end">
                                <button className="btn btn-primary fs-xs">SAVE</button>
                                <button onClick={cancelClick} className="btn btn-light fs-xs ms-2">CANCEL
                                </button>
                            </div>
                        </div>
                    </form>
                </li>
            </>
        )
    }
    return (
        <>
            <li className="list-group-item clamp">
                <i className={icon}></i>
                <span className="ms-2 fw-light">{label}</span>
                {
                    edit && (<button
                        onClick={() => setEdit(true)}
                        className="btn btn-link p-0 fs-sm float-end">{value ? 'Edit' : 'Add'}</button>)
                }
                <span
                    className="fs-sm text-nowrap">
                        <OutputFactory
                            field={field}
                            object={object}
                            {...props}/>
                </span>
            </li>
        </>
    )
}

InputInfo.defaultProps = defaultProps;
export default InputInfo;
