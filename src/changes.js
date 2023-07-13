function changes(a, b) {
    return Object.keys(b)
        .reduce((acc, key) => {
            if (a[key] !== b[key]) acc[key] = b[key];
            return acc;
        }, {});
}

export default changes;
