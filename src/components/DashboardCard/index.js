import React, {useState, useEffect} from "react";
import classNames from "../../classNames";

const defaultProps = {
    className: "bg-white",
    icon: "bi bi-people",
    value: "0",
    label: "TOTAL",
    actionLabel: "VIEW",
};

function DashboardCard({className, icon, label, value, actionLabel, onClick}) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        const duration = 1000; // Animation duration in milliseconds
        const increment = Math.ceil(end / (duration / 10));
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 10);
        return () => {
            clearInterval(timer); // Clean up the timer when component unmounts
        };
    }, [value]);

    return (
        <div className={classNames(className, "shadow-sm bg-white p-3 p-lg-4 rounded")}>
            <div className="d-flex justify-content-between">
                <span className="fs-1">
                  <i className={icon}></i>
                </span>
                <h1>{count}</h1>
            </div>
            <div className="text-end">
                <p className="m-0 text-truncate">{label}</p>
            </div>
            <hr/>
            <button onClick={onClick} className="btn btn-link p-0 w-100 d-flex justify-content-between text-uppercase">
                {actionLabel}
                <i className="bi bi-arrow-right"></i>
            </button>
        </div>
    );
}

DashboardCard.defaultProps = defaultProps;
export default DashboardCard;
