const { v4: uuidv4 } = require('uuid');

async function addMetaData(details) {
    let id = uuidv4()
    await global.redisConnection.set(id, JSON.stringify(details));
    return id;
}

async function updateMovieMetaData(id, details) {
    await global.redisConnection.set(id, JSON.stringify(details));
    return id;
}

async function getMovieMetaDataList(query) {
    let response = [];
    let keys = await global.redisConnection.keys('*');
    for (let i=0; i< keys.length; i++) {
        let obj = {};
        let element = keys[i];
        let result = await global.redisConnection.get(element);
        obj = {id: element, ...JSON.parse(result)};
        response.push(obj);
    }
    return response;
}

async function getSingleMovieMetaData(id) {
    let obj = {};
    let result = await global.redisConnection.get(id);
    obj = JSON.parse(result);
    return obj;
}

async function deleteMetaData(id) {
    await global.redisConnection.del(id);
}

module.exports = {
    addMetaData,
    updateMovieMetaData,
    getMovieMetaDataList,
    getSingleMovieMetaData,
    deleteMetaData
}