import React from "react";
import InputFactory from "../InputFactory";
import FormTab from "./FormTab";

/**
 * Group the fields in the schema based on sections and return the grouped fields object.
 * @param {Object} schema - The schema object containing the fields and sections.
 * @returns {Object} - The grouped fields object.
 */
function group(schema) {
    const {fields, sections} = schema;
    const groups = {
        "General": {}
    };
    for (const key in fields) {
        const options = fields[key];
        if (sections && sections[options.section]) {
            groups[options.section] = groups[options.section] || {};
            groups[options.section][key] = options;
        } else {
            groups["General"][key] = options;
        }
    }
    return groups;
}

/**
 * FormFactory component renders a form based on the provided schema and object data.
 * @param {Object} props - The component props.
 * @param {Object} props.schema - The schema object defining the form structure.
 * @param {Object} props.object - The object data to populate the form fields.
 * @param {Function} props.onChange - The callback function called when a form field value changes.
 * @returns {JSX.Element} - The rendered form component.
 */
function FormFactory({schema, object, onChange}) {
    const tabs = schema.tabs;
    const initialTab = tabs && Object.keys(tabs).length > 0 ? Object.keys(tabs)[0] : null; // Set the initial tab value
    const [_tab, setTab] = React.useState(initialTab);
    const sections = schema.sections || {};
    const groups = group(schema);
    return (
        <>
            <FormTab
                onSet={setTab}
                tabs={tabs}
            />
            <div className="row g-3 mt-3">
                {Object.keys(groups).map(key => {
                    const fields = groups[key];
                    const {label} = sections[key] || {};
                    const components = Object.keys(fields).map(field => {
                        let {type, pattern, write, tab, col, ...options} = fields[field];
                        if ((_tab && tab) && (_tab !== tab)) return null;
                        if (write === false) return null;
                        if (field === 'password') {
                            type = "Password";
                        }

                        return (
                            <div className={col || "col-md-4"} key={field}>
                                {type !== 'Boolean' &&
                                <label className="form-label fs-sm">{options.label || field}</label>}
                                <InputFactory
                                    object={object}
                                    field={field}
                                    onChange={onChange}
                                    type={type}
                                    className="fs-sm"
                                    {...options}
                                />
                            </div>
                        )
                    }).filter(c => c);
                    return (
                        <>
                            {(components.length > 0 && Object.keys(sections).length > 0) && (
                                <div className="col-12">
                                    <p className="small fw-bold mb-0 ms-1">{label || key}</p>
                                    <hr/>
                                </div>
                            )}
                            {components}
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default FormFactory;
