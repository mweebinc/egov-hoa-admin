import React from "react";
import classNames from "../../classNames";

const noop = () => {

}
const defaultProps = {
    className: "form-control",
    loadOptions: noop,
    onChange: noop,
    onSearch: noop,
    onClickAdd: noop,
    onClickClear: noop,
    value: {label: "", value: ""},
    placeholder: "Select",
    dynamic: true
}

function SelectSearch({
                          className,
                          value,
                          placeholder,
                          onChange,
                          onSearch,
                          onClickAdd,
                          onClickClear,
                          focus,
                          options,
                          required,
                          dynamic
                      }) {
    const [search, setSearch] = React.useState('');
    const [text, setText] = React.useState('');
    const [isOpen, setOpen] = React.useState(false);
    const ref = React.useRef(null);

    // handle click outside event
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClickOutside);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // when value change
    React.useEffect(() => {
        setText(value.label);
        setSearch("");
    }, [value]);

    function _onChange(e) {
        const character = e.target.value.replace(text, '');
        if (search === "") {
            e.target.value = character;
        }
        // set the new character input by the user
        setSearch(e.target.value);
        setText(e.target.value);
        onSearch(e.target.value);
    }

    function onClick(e) {
        if (!isOpen) {
            e.target.blur();
        }
        setOpen(!isOpen || focus);
    }

    function onSelect(value, index) {
        onChange(value, index);
        setOpen(false);
        if (search) {
            // reset the options if has search
            onSearch('');
        }
    }

    function onFocus(e) {
        if (!focus) {
            e.target.blur();
        }
    }

    function onClickIcon(e) {
        if (text) {
            onClickClear(e)
        } else if (dynamic) {
            onClickAdd(e)
        }
    }

    const style = {cursor: (isOpen && focus) ? 'text' : 'default'};
    const icon = text ? "bi bi-x" : dynamic ? "bi bi-plus" : "bi bi-chevron-down";
    return (
        <div
            ref={ref}
            style={{position: 'relative'}}>
            <div className="input-group">
                <input
                    onClick={onClick}
                    type="text"
                    className={classNames(className, "border-end-0 pe-0")}
                    placeholder={placeholder}
                    value={text}
                    onChange={_onChange}
                    onFocus={onFocus}
                    style={style}
                    required={required}
                />
                <button
                    onClick={onClickIcon}
                    className="btn btn-link"
                    type="button">
                    <i className={icon}></i>
                </button>
            </div>

            {isOpen && (
                <ul className="list-group rounded-0 bg-white"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        width: '100%',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000
                    }}>
                    {
                        options.map((option, index) => (
                            <li
                                key={option.value}
                                type="button"
                                className="list-group-item list-group-item-action"
                                onClick={() => onSelect(option, index)}>
                                {option.label}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
}

SelectSearch.defaultProps = defaultProps;
export default SelectSearch;
