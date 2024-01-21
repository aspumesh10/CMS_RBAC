const controller = require("./controllers/cmsManagement");
const validator = require("./controllers/validateContent");

function router(app) {
    app.post("/v1/metaData", validator.validateSchema, controller.addMetaData);
    app.get("/v1/metaData", controller.getAllMovieMetaData);
    app.put("/v1/metaData", controller.updateMetaData);
    app.delete("/v1/metaData/:id", controller.deleteMetaData);

}

module.exports = router;