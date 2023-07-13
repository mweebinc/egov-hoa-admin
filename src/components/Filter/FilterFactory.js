import React from "react";
import InputFactory from "../InputFactory";

function FilterFactory({onChange, schemas, type, field, ...options}) {
    function _onChange(value) {
        const where = {};
        switch (type) {
            case "Pointer":
                where[field] = {id: value.id};
                break;
            case "Boolean":
                where[field] = value;
                break;
            default:
                where[field] = {$regex: value, $options: "i"};
        }
        onChange(where);
    }

    switch (type) {
        case "String":
            return (
                <input
                    type="search"
                    onChange={(e) => _onChange(e.target.value)}
                    className="form-control form-control-sm w-auto"
                    placeholder="Search"
                />
            );
        case "Pointer":
            return (
                <InputFactory
                    onChange={_onChange}
                    schemas={schemas}
                    type={type}
                    field="search"
                    object={{}}
                    {...options}
                />
            );
        default:
            return (
                <InputFactory
                    onChange={_onChange}
                    schemas={schemas}
                    type={type}
                    field="search"
                    object={{}}
                    {...options}
                />
            );
    }
}

export default FilterFactory;
