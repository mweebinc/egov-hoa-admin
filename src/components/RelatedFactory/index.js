import React from "react";
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

function RelatedFactory({schema, object, onChange, field, defaultValue}) {
    const [relations, setRelations] = React.useState([]);
    // set default value
    React.useEffect(() => {
        if (defaultValue && defaultValue.length > 0) {
            setRelations(defaultValue);
        } else {
            setRelations([{id: randomString()}]);
        }
    }, [defaultValue]);

    function onClickAdd() {
        setRelations([...relations, {id: randomString()}]);
    }

    const onClickRemove = (index) => {
        const removed = relations.filter((_, i) => i !== index);
        const objects = removed.map(o => ({id: o.id, __operation: 'REMOVE'}));
        onChange(objects);
        setRelations(removed);
    }

    function onChangeValue(index, value, field) {
        relations[index][field] = value;
        onChange(relations);
    }

    return (
        <div className="col-12">
            <hr/>
            {
                relations.map((relation, index) => {
                    return (
                        <div
                            key={relation.index}
                            className="row g-3">
                            {
                                Object.keys(schema.fields).map((key) => {
                                    const {type, label, ...options} = schema.fields[key];
                                    if (options.hasOwnProperty('write') && !options.write) return null;
                                    if (options._type === 'Related') {
                                        return (
                                            <InputFactory
                                                object={object}
                                                field={key}
                                                onChange={onChangeValue}
                                                type={type}
                                                className="fs-sm"
                                                {...options}/>
                                        )
                                    }
                                    return (
                                        <div className="col-md-4" key={key}>
                                            <label
                                                className="form-label fs-sm mt-2">{label || key}</label>
                                            <InputFactory
                                                object={relation}
                                                field={key}
                                                onChange={onChangeValue.bind(this, index)}
                                                type={type}
                                                className="fs-sm"
                                                {...options}/>
                                        </div>
                                    )
                                })
                            }
                            <div className="pb-1 col mt-auto">
                                <button
                                    onClick={onClickRemove.bind(this, index)}
                                    type="button" className="btn btn-link text-danger btn-sm fs-xs">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            <button
                onClick={onClickAdd}
                type="button" className="btn btn-light btn-sm fs-xs mt-3 text-uppercase">
                <i className="bi bi-plus me-2"></i>ADD MORE {field}
            </button>
        </div>
    )
}

export default RelatedFactory;