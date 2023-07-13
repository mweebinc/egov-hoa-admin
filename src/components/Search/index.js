import React from "react";
import {dialog} from "nq-component";
import Filter from "../Filter/Filter";
import classNames from "../../classNames";

let timeout;

function Search({className, schemas, fields, onSubmit}) {
    function onChange(value) {
        const where = {};
        clearTimeout(timeout);
        const or = [];
        Object.keys(fields).forEach((field) => {
            const options = fields[field];
            if (options.type === "String") {
                const query = {};
                query[field] = {$regex: value, $options: "i"};
                or.push(query);
            } else if (options.type === "Boolean") {
                const query = {};
                query[field] = value === "true";
                or.push(query);
            } else if (options.type === "Pointer") {
                const query = {};
                query[field] = {$eq: value}; // Assuming `value` is the object ID to search for
                or.push(query);
            }
        });
        where.$or = or;
        timeout = setTimeout(() => {
            onSubmit(where);
        }, 300);
    }

    function onClickFilter() {
        function _onSubmit(where) {
            dialog.close();
            onSubmit(where);
        }

        dialog.fire({
            html: (
                <Filter
                    schemas={schemas}
                    fields={fields}
                    onSubmit={_onSubmit}
                    onCancel={() => dialog.close()}
                />
            ),
            footer: false,
        });
    }

    return (
        <div className={classNames("input-group", className)}>
            <i
                className="bi bi-search position-absolute"
                style={{
                    zIndex: 4,
                    width: "50px",
                    height: "50px",
                    lineHeight: "40px",
                    textAlign: "center",
                }}
            />
            <input
                onChange={(e) => onChange(e.target.value)}
                type="search"
                className="form-control rounded-pill ps-5 "
                placeholder="Search"
                style={{width: "100px"}}
            />
            <button
                onClick={onClickFilter}
                className="btn btn-link border-0 p-0 ms-1 d-flex align-items-center"
                type="button"
            >
                <i className="bi bi-filter fs-4"></i>Filter
            </button>
        </div>
    );
}

export default Search;
