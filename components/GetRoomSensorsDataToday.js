const db = require('../config/index');

module.exports = function (app) {
    app.get("/api/room/44/sensors/today", function (req, res) {
        res.set('Access-Control-Allow-Origin', '*')
        db.any(
            "SELECT date_time, data AS SensorValue, typevalue.dimension AS unit " +
            "FROM datasensor " +
            "INNER JOIN controller_sensor ON datasensor.id_controllersensor = controller_sensor.id " +
            "INNER JOIN typevalue ON datasensor.id_typevalue = typevalue.id " +
            "WHERE controller_sensor.room = '44' AND DATE(date_time) = '2022-04-14' " +
            "ORDER BY date_time"
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
