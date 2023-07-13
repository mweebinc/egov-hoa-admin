import classNames from "../../classNames";
import React from "react";


const noop = () => {
};
const defaultProps = {
    onSet: noop
};

function FormTab({tabs, onSet}) {
    if (tabs === undefined) return null;
    return (
        <nav>
            <div className="nav nav-tabs">
                {
                    Object.keys(tabs).map((key, index) => {
                        const {label} = tabs[key];
                        return (
                            <button
                                onClick={() => onSet(key)}
                                className={classNames("nav-link", index === 0 ? "active" : "")}
                                data-bs-toggle="tab"
                                data-bs-target="#nav-moodle"
                                type="button">
                                {label || key}
                            </button>
                        );
                    })}
            </div>
        </nav>
    )
}

FormTab.defaultProps = defaultProps;
export default FormTab;