import React from "react";

function forwardRef(WrappedComponent) {
    return React.forwardRef((props, ref) => {
        return (<WrappedComponent
            ref={ref}
            {...props} />)
    });
}

export default forwardRef;