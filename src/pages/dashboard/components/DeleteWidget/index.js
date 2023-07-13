import React from "react";
import IconItem from "../../../../components/IconItem";
import {SelectSearch} from "nq-component";

function mapOption(o, index) {
    const text = o.label || 'Total ' + o.collection;
    const label = <span className="text-capitalize">{o.label || text}</span>;
    return {label: <IconItem value={o.icon || 'bi bi-pie-chart'} label={label}/>, value: text, index: index}
}

function DeleteWidget({objects, onSubmit, onCancel}) {
    const [value, setValue] = React.useState({});

    function onChange(option) {
        setValue(option);
    }

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(value.index);
    }


    return (
        <div className="p-3 pb-4">
            <h4 className="fw-bold">Delete Widget</h4>
            <form className="mt-3" onSubmit={_onSubmit}>
                <div className="row g-3">
                    <div className="col-md-12">
                        <SelectSearch
                            value={{label: value.value}}
                            options={objects.map(mapOption)}
                            onChange={onChange}
                            field="type"
                            className="form-control"
                            required/>
                    </div>
                    <div className="mt-3 text-end">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={onCancel}>CANCEL
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-danger btn-sm ms-3">
                            <i className="bi bi-trash me-2"></i>YES, DELETE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DeleteWidget;
