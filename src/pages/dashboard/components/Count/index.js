import React from "react";
import DashboardCard from "../../../../components/DashboardCard";
import {findObjectUseCase} from "../../../../usecases/object";

const defaultProps = {
    where: {},
};

function Count({collection, label, icon, where, actionLabel, ...props}) {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        const query = {count: true, where, limit: 1}; // Move the 'query' object inside the useEffect callback
        async function fetchCount() {
            try {
                const find = findObjectUseCase(); // Move the 'find' function inside the fetchCount function
                const {count} = await find.execute(collection, query);
                setCount(count);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCount();
    }, [collection, where]);

    return (
        <DashboardCard
            icon={icon || 'bi bi-pie-chart'}
            label={label || <span className="text-capitalize">Total {collection}</span>}
            actionLabel={actionLabel || "VIEW " + collection}
            value={count}
            {...props}
        />
    );
}

Count.defaultProps = defaultProps;
export default Count;
