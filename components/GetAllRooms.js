const db = require('../config/index');
//const pool = require('../config/db');

module.exports = function (app) {
    app.get("/api/rooms", async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*')
        db.any("SELECT DISTINCT(room) FROM controller_sensor")
            .then(function (data) {
                res.json({
                    status: "success",
                    data,
                })
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any room",
                    error: err,
                });
            });
    })
};
