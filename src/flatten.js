function flatArray(arr, values, prefix) {
    return arr.reduce((acc, cur) => {
        values.forEach(item => {
            if (typeof item === 'object') {
                const objs = flatten(item, prefix);
                objs.forEach(obj => {
                    acc.push({...cur, ...obj});
                });
                return;
            }
            const object = {};
            object[prefix.join('_')] = item;
            acc.push({...cur,...object});
        });
        return acc;
    }, []);
}

/**
 * used to flat object
 * @param object
 * @param prefix
 * @returns {Array}
 */
function flatten(object, prefix = []) {
    return Object.entries(object)
        .reduce((acc, [key, value]) => {
            // if type of the value is array expect to add new data
            if (Array.isArray(value) && value.length) {
                return flatArray(acc, value, prefix.concat(key));
            }
            // value is object
            if (value !== null && typeof value === 'object') {
                // if value is object merge the current object
                acc[0] = {...acc[0], ...flatten(value, prefix.concat(key))[0]}
                return acc;
            }
            // value is string or number
            acc[0][prefix.concat(key).join('_')] = value;
            return acc;
        }, [{}]);
}


export default flatten;
