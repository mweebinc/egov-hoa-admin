import React from "react";

function TypeString({onChange, field}) {
    function _onChange(value) {
        const where = {};
        where[field] = {$regex: value, $options: 'i'};
        onChange(where);
    }
    return (
        <input
            type="text"
            onChange={e => _onChange(e.target.value)}
            className="form-control form-control-sm shadow-none w-auto py-2  rounded-full"
            placeholder="Search"></input>
    )
}

export default TypeString;
