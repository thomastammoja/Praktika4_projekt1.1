const db = require('../config/index');

module.exports = function (app) {
    app.get("/api/controller/:number/sensors", function (req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        db.any(
            "SELECT sensor.sensorname FROM sensor INNER JOIN controller_sensor ON controller_sensor.id_sensor = sensor.id " +
            "WHERE controller_sensor.id_controller = " + req.params.number
        )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch(function (err) {
                return next(err);
            });
    });
};
