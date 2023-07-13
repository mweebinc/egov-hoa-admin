import React from "react";
import InputFactory from "../../components/InputFactory";

function InputBio({field, object, onSave, ...props}) {
    const [edit, setEdit] = React.useState(false);
    const value = object[field];
    const temp = React.useMemo(() => Object.assign({}, object), [object]);

    function saveClick() {
        setEdit(false);
        object[field] = temp[field];
        onSave();
    }

    function cancelClick() {
        temp[field] = object[field];
        setEdit(false);
    }

    if (edit) {
        return (
            <div className="text-end">
                <InputFactory
                    type='Text'
                    field={field}
                    object={temp}
                    {...props}
                />
                <div className="my-2">
                    <button onClick={saveClick} className="btn btn-primary fs-xs">
                        SAVE
                    </button>
                    <button onClick={cancelClick} className="btn btn-light fs-xs ms-2">CANCEL</button>
                </div>
            </div>
        )
    }
    return (
        <>
            <p className="fs-sm mb-0">{value}</p>
            <div
                role="button"
                onClick={() => setEdit(true)}
                className="btn-link fs-sm">{value ? 'Edit' : 'Add'} Bio
            </div>
        </>
    )
}

export default InputBio;
