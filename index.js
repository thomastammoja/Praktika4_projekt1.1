var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var config = require("./config");
var pgp = require("pg-promise")();
var db = pgp(config.getDbConnectionString());

app.listen(PORT);

// Ülesanne 1
// Kõik ruumid
app.get("/api/rooms", (req, res) => {
    db.any("SELECT DISTINCT room FROM controller_sensor")
        .then(function (data) {
            res.json({
                status: "success",
                data: data,
            });
        })

        .catch((err) => {
            res.json({
                description: "Can’t find any room",
                error: err,
            });
        });
});

// Sensorid kindlas ruumis
app.get("/api/room/:number/sensors", (req, res) => {
    db.any(
        "SELECT sensor.sensorname FROM sensor INNER JOIN controller_sensor ON controller_sensor.id_sensor=sensor.id " +
        "WHERE controller_sensor.room=" + req.params.number + ":: varchar"
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


// Ülesanne 2
// Kõik kontrollerid andmebaasis
app.get("/api/sensors", (req, res) => {
    db.any(
        "SELECT controllername FROM controller"
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

// Andurid ühendatud kindla kontrolleriga
app.get("/api/controller/:number/sensors", (req, res) => {
    db.any(
        "SELECT sensor.sensorname FROM sensor INNER JOIN controller_sensor ON controller_sensor.id_sensor=sensor.id " +
        "WHERE controller_sensor.id_controller=" + req.params.number
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

// Auditooriumi nr 44 andurite tänased andmed
// Kasutasin staatilist kuupäeva 2022-04-14, sest sellest kuupäevast on viimased andmed pärit
// Dünaamilise kuupäeva semel kasutaksin sellist WHERE konditsiooni: DATE(date_time) = CURRENT_DATE
app.get("/api/room/44/sensors/today", (req, res) => {
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