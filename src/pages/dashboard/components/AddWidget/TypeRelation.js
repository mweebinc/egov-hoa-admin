import React from "react";
import InputFactory from "../../../../components/InputFactory";

function TypeRelation({collections, onChange}) {
    function _onChange(value) {
        onChange({target: value});
    }

    return (
        <div className="col-md-12">
            <label className="form-label fs-sm">Target Collection</label>
            <InputFactory
                type="Enum"
                options={collections}
                onChange={_onChange}
                className="form-control"
                required
            />
        </div>
    )
}

export default TypeRelation;
