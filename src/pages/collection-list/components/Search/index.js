import React from 'react';
import InputType from "./InputType";

let timeout;
const types = ['String', 'Date'];

function Search({fields, onSubmit}) {
    const [key, setKey] = React.useState();
    const [where, setWhere] = React.useState({});

    function submit(e) {
        e.preventDefault();
        onSubmit(where);
    }

    React.useEffect(() => {
        const keys = Object.keys(fields);
        setKey(keys[0]);
    }, [fields]);

    function onChange(where) {
        setWhere(where);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSubmit(where);
        }, 300);
    }

    return (
        <form onSubmit={submit}>
            <div className="d-flex justify-content-end align-items-center mt-3">
                {/* <select
                    value={key}
                    className="form-select shadow-none fs-xs w-auto rounded-0 rounded-start"
                    onChange={e => setKey(e.target.value)}>
                    {
                        Object.keys(fields)
                            .map((key) => {
                                const options = fields[key];
                                if (!types.includes(options.type)) return null;
                                if (options.hasOwnProperty('read') && !options.read) return null;
                                return (
                                    <option key={key} value={key}>{key}</option>
                                );
                            })
                    }
                </select> */}

                {
                    fields[key] && (
                        <InputType
                            type={fields[key].type}
                            field={key}
                            onChange={onChange}
                        />
                    )

                }
                <span class="bi bi-filter ps-3 pe-3">Filter</span>
            </div>
        </form>
    );
}

export default Search;
