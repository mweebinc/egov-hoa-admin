export const isObject = (val) => {
    const type = typeof val;
    return type === 'object' && !Array.isArray(val) && !!val;
};
function addArray(fromSchemas, toSchemas) {
    let result = fromSchemas.slice();
    loop: for (let to of toSchemas) {
        let toClassName = to.name;
        for (let from of result) {
            let fromClassName = from.name;
            if (fromClassName === toClassName) {
                continue loop;
            }
        }
        result.push(to);
    }
    return result;
}

function objectAssign(from, to) {
    for (let key in to) {
        let valueFrom = from[key];
        let valueTo = to[key];
        //remove object if null
        if (valueFrom === null) {
            delete from[key];
            continue;
        }
        //if from is undefined
        //assign to value
        if (!valueFrom) {
            from[key] = valueTo;
            valueFrom = valueTo;
        }
        // go deeper
        if (isObject(valueTo)) {
            objectAssign(valueFrom, valueTo);
        }
    }
}

function mergeObject(from, to) {
    let fromClassName = from.name;
    let toClassName = to.name;
    if (fromClassName === toClassName) {
        objectAssign(from, to);
    }
}

function mergeSchema(target, source) {
    let result = addArray(target, source);
    for (let from of result) {
        for (let to of source) {
            mergeObject(from, to);
        }
    }
    return result;
}

export default mergeSchema;
