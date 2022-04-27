const db = require('../config/index');

module.exports = function (app) {
    app.get("/api/controllers", function (req, res) {
        res.set('Access-Control-Allow-Origin', '*')
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
};
