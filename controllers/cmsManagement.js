const cms = require("../components/cms");
const permission = require("../components/permission");

function validateUuid(id) {
    const regex = new RegExp('^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$', 'g');
    return regex.test(id);
}

const ROLE_LIST = ["Admin", "Editor", "Viewer"];


/**
 * This function is responsible for ingesting the movie meta-data
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function addMetaData(req, res) {
    try {
        let metaDetailsArr = req.body.data;
        let movieIds = [];
        for (let movieMetaIndex = 0; movieMetaIndex < metaDetailsArr.length; movieMetaIndex++) {
            let metaDetails = metaDetailsArr[movieMetaIndex];
            let details = {
                title: metaDetails.title,
                description: metaDetails.description,
                release_date: metaDetails.release_date,
                genres: metaDetails.genres,
                cast: metaDetails.cast,
                crew: metaDetails.crew,
            }
            let accessDetails = metaDetails.access_control;
            let incomingRoleList = Object.keys(accessDetails);
            let movieId = await cms.addMetaData(details);
            if (!movieId) {
                return res.status(422).json({ status: 422, message: "Unable to process the meta data addition", data: null });
            }
            movieIds.push(movieId);
            for (let i = 0; i < incomingRoleList.length; i++) {
                if (ROLE_LIST.includes(incomingRoleList[i])) {
                    for (let j = 0; j < accessDetails[incomingRoleList[i]].length; j++) {
                        await permission.addPermission(movieId, incomingRoleList[i], accessDetails[incomingRoleList[i]][j]);
                    }
                }
            }
        }
        return res.status(201).json({ status: 200, message: "Movie meta data added successfully", data: { ids: movieIds } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Something Went Wrong" });
    }
}




/**
 * This function is responsible for deleting metadata information
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function deleteMetaData(req, res) {
    try {
        let id = req.params.id;
        if (!validateUuid(id)) {
            return res.status(400).json({ status: 400, message: "invalid uuid received", data: null });
        }

        let details = await cms.getSingleMovieMetaData(id);
        if (!details) {
            return res.status(404).json({ status: 404, message: "details not found", data: null });
        }

        let delResult = await cms.deleteMetaData(id);
        return res.status(200).json({ status: 200, message: "", data: details });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Something Went Wrong" });
    }
}

async function getAllMovieMetaData(req, res) {
    try {
        let roleName = req.query.roleName;
        let moviePermssionMap = {};
        if (!ROLE_LIST.includes(roleName)) {
            return res.status(400).json({ status: 400, message: "please provide valid role name" });
        }
        // get the permissions specific to movie series
        let permissionDetailsArr = await permission.getPermissions(roleName);
        console.log(permissionDetailsArr)
        for (let i = 0; i < permissionDetailsArr.length; i++) {
            let details = permissionDetailsArr[i];
            if (moviePermssionMap[details['movieId']]) {
                moviePermssionMap[details['movieId']].push(details['permissionModule']);
            } else {
                moviePermssionMap[details['movieId']] = [details['permissionModule']];
            }
        }
        console.log(moviePermssionMap);
        let allData = await cms.getMovieMetaDataList();
        console.log(allData)
        let responseList = [];
        if (allData && allData.length > 0) {
            //send only those data which is relevant for the movie
            allData.forEach(movieMetaData => {
                let response = {};
                if (Array.isArray(moviePermssionMap[movieMetaData["id"]])) {
                    moviePermssionMap[movieMetaData["id"]].forEach(element => {
                        response[element] = movieMetaData[element];
                    });
                    response["id"] = movieMetaData["id"];
                    response["title"] = movieMetaData["title"];
                    response["description"] = movieMetaData["description"];
                    response["release_date"] = movieMetaData["release_date"];
                    responseList.push(response);
                }
            });
        }
        return res.status(200).json({ status: 200, message: "", data: responseList });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Something Went Wrong" });
    }
}

/**
 * This function is responsible for updating the metadata
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function updateMetaData(req, res) {
    try {
        return res.status(200).json({ status: 200, message: "data updated successfully", data: "" });    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Something Went Wrong" });
    }
}


module.exports = {
    addMetaData,
    updateMetaData,
    deleteMetaData,
    getAllMovieMetaData
}