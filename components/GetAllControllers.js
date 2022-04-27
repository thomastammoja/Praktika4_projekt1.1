const db = require('../config/index');

module.exports = function (app) {
    app.get("/api/controllers", function (req, res) {
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
