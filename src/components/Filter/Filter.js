import React from "react";
import FilterFactory from "./FilterFactory";

// const types = {
//     String: ["exists", "equals", "contains"],
//     Boolean: ["equals"],
//     Pointer: ["exists", "equals"],
//     Date: ["exists", "before", "after"],
// };
const exclude = ["Array", "ACL", "Image", "File"];

function Filter({schemas, fields, onSubmit, onCancel}) {
    const [keys, setKeys] = React.useState([]); // Array of keys for each filter
    const [filters, setFilters] = React.useState([{}]);
    const [where, setWhere] = React.useState({});


    function onClickAddFilter() {
        setFilters([...filters, {}]);
        setKeys([...keys, null]);
    }

    function onChange(where) {
        setWhere(where);
    }


    React.useEffect(() => {
        const initialKeys = Object.keys(fields);
        if (initialKeys.length > 0) {
            setKeys([initialKeys[0]]);
        } else {
            setKeys([]);
        }
    }, [fields]);

    function handleKeyChange(index, value) {
        const updatedKeys = [...keys];
        updatedKeys[index] = value;
        setKeys(updatedKeys);
    }

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(where);
    }

    return (
        <>
            <div className="p-2 pb-3">
                <h4 className="fw-bold">Filter</h4>
                <form onSubmit={_onSubmit}>
                    <div>
                        {filters.map((_, index) => {
                            const filterKey = keys[index]; // Get the key for the current filter
                            return (
                                <div className="input-group mt-2" key={index}>
                                    <select
                                        value={filterKey}
                                        className="form-select shadow-none rounded-0 rounded-start"
                                        onChange={(e) => handleKeyChange(index, e.target.value)}>
                                        {Object.keys(fields).map((key) => {
                                            const options = fields[key];
                                            if (exclude.includes(options._type || options.type)) {
                                                return null;
                                            }
                                            return (
                                                <option key={key} value={key}>
                                                    {key}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {
                                        filterKey && (
                                            <>
                                                <FilterFactory
                                                    onChange={onChange}
                                                    schemas={schemas}
                                                    field={filterKey}
                                                    {...fields[filterKey]}
                                                />
                                            </>
                                        )}
                                </div>
                            );
                        })}
                        <div className="mt-3">
                            <button
                                onClick={onClickAddFilter}
                                type="button"
                                className="btn btn-light btn-sm"
                            >
                                Add filter
                            </button>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary btn-sm">
                                <i className="bi bi-file-earmark-check me-2"></i>Apply
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm ms-2"
                                onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Filter;
