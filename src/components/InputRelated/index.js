import React, {Fragment} from "react";
import InputFactory from "../InputFactory";



function randomString(length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
function InputRelated({
                          className,
                          field,
                          fields,
                          object,
                          target,
                          isMulti,
                          schemas,
                          find,
                          where,
                          disabled,
                          onChange,
                          label,
                          indexes,
                          ...props
                      }
) {
    const [value, setValue] = React.useState([]);
    // set default value
    React.useEffect(() => {
        const defaultValue = object[field];
        defaultValue && setValue(defaultValue);
    }, [object, field]);
    // get schema
    const schema = schemas.find(s => s.collection === target);
    const _fields = fields || schema.fields;

    function onClickAdd() {
        value.push({id: randomString()});
        setValue([...value]);
        // add only new data
        object[field] = value;
    }

    const onClickRemove = (index) => {
        const removed = value.splice(index, 1)
            .filter(o => o.id)
            .map(o => ({id: o.id, __operation: 'REMOVE'}));
        setValue([...value]);
        object[field] = [...value, ...removed];
    }

    return (
        <>
            {
                value.map((relation, index) => {
                    return (
                        <Fragment
                            key={relation.id}>
                            <div className="col-12"></div>
                            {
                                Object.keys(_fields).map((field) => {
                                    const {type, label, ...options} = _fields[field];
                                    if (options.hasOwnProperty('write') && !options.write) return null;
                                    if (options._type === 'Related') {
                                        return (
                                            <InputFactory
                                                className="fs-sm"
                                                field={field}
                                                type={type}
                                                object={relation}
                                                {...options}/>
                                        )
                                    }
                                    return (
                                        <div className="col-md-4" key={field}>
                                            <label
                                                className="form-label fs-sm">{label || field}</label>
                                            <InputFactory
                                                className="fs-sm"
                                                field={field}
                                                type={type}
                                                object={relation}
                                                {...options}/>
                                        </div>
                                    )
                                })}
                            <div>
                                <button
                                    onClick={onClickRemove.bind(this, index)}
                                    type="button" className="btn btn-link text-danger btn-sm fs-xs">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </Fragment>
                    )
                })
            }
            <div className="col-12">
                <button
                    onClick={onClickAdd}
                    type="button" className="btn btn-dark btn-sm fs-xs">add more {field}
                </button>
            </div>
        </>
    )
}

export default InputRelated;