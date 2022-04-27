var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

var GetAllRooms = require('./components/GetAllRooms');
var GetRoomSensors = require('./components/GetRoomSensors');
var GetAllControllers = require('./components/GetAllControllers');
var GetControllerSensor = require('./components/GetControllerSensors');
var GetRoomSensorsDataToday = require('./components/GetRoomSensorsDataToday');

// Vahevara
var cors = require("cors");
app.use(cors());

// Ülesanne 1
// Kõik ruumid
GetAllRooms(app);

// Sensorid kindlas ruumis
GetRoomSensors(app);


// Ülesanne 2
// Kõik kontrollerid andmebaasis
GetAllControllers(app);

// Andurid ühendatud kindla kontrolleriga
GetControllerSensor(app);

// Auditooriumi nr 44 andurite tänased andmed
// Kasutasin staatilist kuupäeva 2022-04-14, sest sellest kuupäevast on viimased andmed pärit
// Dünaamilise kuupäeva semel kasutaksin sellist WHERE konditsiooni: DATE(date_time) = CURRENT_DATE
GetRoomSensorsDataToday(app);

app.listen(PORT);