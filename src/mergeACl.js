/**
 * This function takes an array of document objects and merges their ACLs (access control lists).
 * Each document's ACL should be an object containing 'read' and 'write' properties, which are arrays of permissions.
 *
 * @param {Array} documents - An array of document objects with 'acl' properties
 * @returns {Object} - An object with merged 'read' and 'write' arrays from all document ACLs
 */
function mergeACl(documents) {
    return documents.reduce((acc, cur) => {
        // Initialize 'read' and 'write' arrays if they haven't been already
        acc.read = acc.read || [];
        acc.write = acc.write || [];
        // Merge current document's 'read' and 'write' arrays with the accumulated ones
        // and use Set to remove duplicates
        acc.read = [...new Set([...acc.read, ...cur.acl.read])];
        acc.write = [...new Set([...acc.write, ...cur.acl.write])];
        // Return the updated accumulator for the next iteration (or as the final result)
        return acc;
    }, {});
}

export default mergeACl;
