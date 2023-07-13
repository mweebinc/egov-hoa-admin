import React from "react";
import InputFactory from "../../components/InputFactory";
import getValue from "../../getValue";

function InputForm({title, fields, object, onSave}) {
    const [isEdit, setEdit] = React.useState(false);
    const temp = React.useMemo(() => Object.assign({}, object), [object]);

    function onSubmit(e) {
        e.preventDefault();
        setEdit(false);
        Object.keys(fields).forEach(field => {
            object[field] = temp[field];
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
            <>
                <div className="d-flex">
                    <span className="text-muted fs-sm">{title}</span>
                </div>
                <ul className="list-group list-group-flush">
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
                </ul>
            </>
        );
    }
    return (
        <>
            <div className="d-flex">
                <span className="text-muted fs-sm">{title}</span>
                <button onClick={() => setEdit(true)} className="btn btn-link p-0 ms-auto fs-sm">Edit</button>
            </div>
            <ul className="list-group list-group-flush">
                {
                    Object.keys(fields).map((field) => {
                        const {type, label, icon, ...options} = fields[field];
                        return (
                            <li
                                key={field}
                                className="list-group-item text-nowrap text-truncate">
                                <i className={icon}></i>
                                <span className="ms-2 fw-light">{label}</span>
                                <span className="fs-sm">
                                    {/*<OutputFactory*/}
                                    {/*    type={getValue(type, type, 'String')}*/}
                                    {/*    field={field}*/}
                                    {/*    object={object}*/}
                                    {/*    {...options}*/}
                                    {/*/>*/}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );
}

export default InputForm;
