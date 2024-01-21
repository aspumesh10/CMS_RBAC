## Movies Meta Data CMS with RBAC

# Description
    This Project exposes apis to add movie series meta data ingestion
    As well as provides the RBAC mechanism to access information as per role assigned

    This project uses 2 in-memory databases, 
    1. Redis to store consolidated data coming from partners
    2. Sqlite to store rolePermission relations and access control details

    Sample Redis Data
        Here movies meta data stored against uuid

        127.0.0.1:6379> GET c1e66dc5-866d-4847-bf1d-8c0030f96fe6
        "{\"title\":\"Inception\",\"description\":\"A mind-bending heist movie\",\"release_date\":\"2010-07-16\",\"cast\":[\"Leonardo DiCaprio\",\"Joseph Gordon-Levitt\",\"Ellen Page\"],\"crew\":{\"director\":\"Christopher Nolan\",\"producer\":\"Emma Thomas\",\"writer\":\"Christopher Nolan\"}}"

    Sample Role permission Data

        sqlite> SELECT * from rolePermission;
        id  movieId                               roleName  permissionModule
        --  ------------------------------------  --------  ----------------
        1   059886b5-cbd5-4f21-8e58-e9f380765c5d  Admin     description
        2   059886b5-cbd5-4f21-8e58-e9f380765c5d  Admin     genres
        3   059886b5-cbd5-4f21-8e58-e9f380765c5d  Admin     cast
        4   059886b5-cbd5-4f21-8e58-e9f380765c5d  Admin     crew
        5   059886b5-cbd5-4f21-8e58-e9f380765c5d  Editor    description
        6   059886b5-cbd5-4f21-8e58-e9f380765c5d  Editor    genres
        7   059886b5-cbd5-4f21-8e58-e9f380765c5d  Editor    cast

# Languages used
    Nodejs

# Third party Libraries Used
    Express
    Redis
    Sqlite3

#   setup

1.  setup redis in the system using below process
https://redis.io/docs/install/install-redis/install-redis-on-mac-os/
https://redis.io/docs/install/install-redis/install-redis-on-linux/
make sure to have redis installed before running the app

2.  npm run install to install the node modules

3.  To run the app
    node app.js   
    or 
    npm run dev    -- to run with prod env

4. use postman collection to view all apis


