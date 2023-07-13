function canRead(roles, permission) {
    for (const role of roles) {
        const id = 'role:' + role.name.toLowerCase();
        const access = permission['find'] || [];
        if (access.includes(id)) {
            return true;
        }
    }
    return false;
}

export default canRead;
