const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./cmsRbac.db');


//with serialize method
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS rolePermission");

    //id roleName(editor,viewer) entity(cast, genre, crew)
    db.run("CREATE TABLE rolePermission ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [movieId]  NVARCHAR(120), [roleName] NVARCHAR(120), [permissionModule] NVARCHAR(120))");
});

module.exports = db