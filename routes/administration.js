var authMw = require("../middleware/auth/auth");
var checkCredentialsMw = require("../middleware/auth/checkCredentials");
var logoutMw = require("../middleware/auth/logout");

var editDatesMw = require("../middleware/dates/editDates");

var checkIfNotReservedMw = require("../middleware/reservations/checkIfNotReserved");
var delReservationMw = require("../middleware/reservations/delReservation");
var getReservationMw = require("../middleware/reservations/getReservation");
var getReservationsMw = require("../middleware/reservations/getReservations");
var getUserReservationMw = require("../middleware/reservations/getUserReservation");
var saveReservationMw = require("../middleware/reservations/saveReservation");

var checkPasswordMatchMw = require("../middleware/users/checkPasswordMatch");
var checkPermissionMw = require("../middleware/users/checkPermission");
var delUserMw = require("../middleware/users/delUser");
var getUserMw = require("../middleware/users/getUser");
var getUsersMw = require("../middleware/users/getUsers");
var saveUserMw = require("../middleware/users/saveUser");
var registerUserMw = require("../middleware/users/registerUser");

var directToMw = require("../middleware/utils/directTo");
var renderMw = require("../middleware/utils/render");
const directTo = require("../middleware/utils/directTo");

module.exports = function (app) {
    
    var objectRepository = {
        taskModel: "taskModel",
        commentModel: "commentModel",
        userModel: "userModel"
      };

    app.get("/administration",
        authMw(objectRepository, "admin"),
        getUsersMw(objectRepository),
        renderMw(objectRepository, "administration")
    );

    app.get("/administration/edit/user/:userid",
        authMw(objectRepository, "admin"),
        getUserMw(objectRepository),
        getUserReservationMw(objectRepository),
        renderMw(objectRepository, "administration_edit_user")
    );

    app.post("/administration/edit/user/:userid",
        authMw(objectRepository, "admin"),
        (req, res, next) => {
            req.session.prev_url = "/administration/edit/user/"+req.params.userid;
            return next();
        },
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository)
    );

    app.get("/administration/del/user/:userid",
        authMw(objectRepository, "admin"),
        (req, res, next) => {
            req.session.prev_url = "/administration/edit/user/"+req.params.userid;
            return next();
        },
        checkPasswordMatchMw(objectRepository),
        delUserMw(objectRepository)
    );

    app.post("/administration/date",
        authMw(objectRepository, "admin"),
        editDatesMw(objectRepository)
    );

    app.get("/administration/new_user",
        authMw(objectRepository, "admin"),
        renderMw(objectRepository, "administration_new_user")
    );

    app.post("/administration/new_user",
        authMw(objectRepository, "admin"),
        (req, res, next) => {
            req.session.prev_url = "/administration/new_user";
            return next();
        },
        checkPasswordMatchMw(objectRepository),
        registerUserMw(objectRepository)
    );

};