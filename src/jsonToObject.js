function transformValue(value, type) {
    switch (type) {
        case 'Relation':
            return [value];
        default:
            return value;
    }
}

function jsonToObject(json, fields) {
    const object = {};
    for (const key in fields) {
        const option = fields[key];
        const value = json[key];
        if (value) {
            object[key] = transformValue(value, option.type);
        }
    }
    return object;
}

export default jsonToObject;