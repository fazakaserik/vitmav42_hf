var authMw = require("../middleware/auth/auth");
var checkCredentialsMw = require("../middleware/auth/checkCredentials");
var logoutMw = require("../middleware/auth/logout");

var closeDatesMw = require("../middleware/dates/closeDates");
var openDatesMw = require("../middleware/dates/openDates");

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

var directToMw = require("../middleware/utils/directTo");
var renderMw = require("../middleware/utils/render");
const directTo = require("../middleware/utils/directTo");

module.exports = function (app) {
    
    var objectRepository = {
        taskModel: "taskModel",
        commentModel: "commentModel",
        userModel: "userModel"
      };

    app.get("/",
        authMw(objectRepository),
        renderMw(objectRepository, "login")
    );

    app.get("/login",
        checkCredentialsMw(objectRepository),
        renderMw(objectRepository, "login")
    );

    app.get("/login/?err=:err_msg",
        renderMw(objectRepository, "index", "err_msg")
    );

    app.get("/news",
        authMw(objectRepository),
        renderMw(objectRepository, "news")
    );

    app.get("/gallery",
        authMw(objectRepository),
        renderMw(objectRepository, "gallery")
    );

    app.get("/profile",
        authMw(objectRepository),
        getUserMw(objectRepository),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "profile")
    );

    app.post("/profile",
        authMw(objectRepository),
        getUserMw(objectRepository),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "profile")
    );

    app.get("/administration",
        authMw(objectRepository, "admin"),
        getUsersMw(objectRepository),
        renderMw(objectRepository, "administration")
    );

    app.get("/administration/edit/user/:userid",
        authMw(objectRepository, "admin"),
        getUserMw(objectRepository),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "administration_edit_user")
    );

    app.post("/administration/edit/user/:userid",
        authMw(objectRepository, "admin"),
        getUserMw(objectRepository),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "administration_edit_user")
    );

    app.get("/administration/del/user/:userid",
        authMw(objectRepository, "admin"),
        getUserMw(objectRepository),
        delUserMw(objectRepository),
        directToMw(objectRepository, "administration")
    );

    app.get("/administration/open/from=:start_date&to=:end_date",
        authMw(objectRepository, "admin"),
        openDatesMw(objectRepository),
        directToMw(objectRepository, "administration")
    );

    app.get("/administration/close/from=:start_date&to=:end_date",
        authMw(objectRepository, "admin"),
        closeDatesMw(objectRepository),
        directToMw(objectRepository, "administration")
    );

    app.get("/administration/new_user",
        authMw(objectRepository, "admin"),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "administration_new_user")
    );

    app.post("/administration/new_user",
        authMw(objectRepository, "admin"),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        renderMw(objectRepository, "administration_new_user")
    );

    app.get("/reservations/all",
        authMw(objectRepository),
        getReservationsMw(objectRepository),
        renderMw(objectRepository, "reservations_all")
    );

    app.get("/reservations/new",
        authMw(objectRepository),
        checkIfNotReservedMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservations_new")
    );

    app.post("/reservations/new",
        authMw(objectRepository),
        checkIfNotReservedMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservations_new")
    );

    app.get("/reservations/user/:userid",
        authMw(objectRepository),
        getUserReservationMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservations_own")
    );

    app.get("/reservations/del/:reservationid",
        authMw(objectRepository),
        checkPermissionMw(objectRepository),
        getReservationMw(objectRepository),
        delReservationMw(objectRepository)
    );

    app.get("/logout",
        logoutMw(objectRepository),
        directToMw(objectRepository, "login")
    );
};