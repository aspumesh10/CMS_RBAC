/**
 * This function is responsible for setting the role permsssion
 * @param {string} movieId 
 * @param {string} roleName 
 * @param {string} entity 
 * @returns 
 */
async function addPermission(movieId, roleName, entity) {
    return new Promise((resolve, reject) => {
        global.sqliteDb.run("INSERT INTO rolePermission (movieId, roleName, permissionModule) VALUES  (?, ?, ?)",
            [movieId, roleName, entity],
            function (err, res) {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log(res)
                    return resolve();
                }
            }
        )
    });
}

/**
 * This function is responsible for getting role permission
 * @param {string} roleName 
 * @returns 
 */
async function getPermissions(roleName) {
    return new Promise((resolve, reject) => {
        const query = "SELECT movieId, permissionModule FROM rolePermission WHERE roleName = ?"
        global.sqliteDb.all(query, [roleName], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                // Process the retrieved rows
                resolve(rows);
            }
        });
    });
}

module.exports = {
    addPermission,
    getPermissions
}