import React from "react";
import classNames from "../../classNames";

const defaultProps = {
    onClick: () => {
    }
}

function ButtonGroup({options, onClick}) {
    const [position, setPosition] = React.useState(0);

    function _onClick(index) {
        setPosition(index);
        onClick(options[index], index);
    }

    return (
        <div className="btn-group">
            {
                options.map((o, i) => {
                    return (
                        <button
                            onClick={_onClick.bind(this, i)}
                            className={classNames("btn btn-outline-primary", position === i && 'active')}
                            type="button">{o.label}
                        </button>
                    )
                })
            }
        </div>
    )
}

ButtonGroup.defaultProps = defaultProps;
export default ButtonGroup;