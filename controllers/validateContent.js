const partnerSchema = {
    "1": {
        "title": {
            "type": "string",
            "required": true
        },
        "description": {
            "type": "string",
            "required": true
        },
        "release_date": {
            "type": "date",
            "required": true
        },
        "genres": {
            "type": "object",
            "required": true
        },
        "cast": {
            "type": "object",
            "required": true,
        },
        "crew": {
            "type": "object",
            "required": true,
        },
        "access_control": {
            "type": "object",
            "required": true,
        }
    }
}

function validateSchema(req, res, next) {
    try {
        if (req.body.partnerId == 1) {
            //validate the schema against partner id
            return next()
        } else {
            return res.status(400).json({ status: 400, message: "Invalid partner details received", data: null });
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid schema received", data: null });
    }
}

module.exports = {
    validateSchema
}