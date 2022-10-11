var authMw = require("@Mw/auth/auth");
var checkCredentialsMw = require("@Mw/auth/checkCredentials");
var logoutMw = require("@Mw/auth/logout");

var closeDatesMw = require("@Mw/dates/closeDates");
var openDatesMw = require("@Mw/dates/openDates");

var checkIfNotReservedMw = require("@Mw/reservations/checkIfNotReserved");
var delReservationMw = require("@Mw/reservations/delReservation");
var getReservationMw = require("@Mw/reservations/getReservation");
var getReservationsMw = require("@Mw/reservations/getReservations");
var getUserReservationMw = require("@Mw/reservations/getUserReservation");
var saveReservationMw = require("@Mw/reservations/saveReservation");

var checkPasswordMatchMw = require("@Mw/users/checkPasswordMatch");
var checkPermissionMw = require("@Mw/users/checkPermission");
var delUserMw = require("@Mw/users/delUser");
var getUserMw = require("@Mw/users/getUser");
var getUsersMw = require("@Mw/users/getUsers");
var saveUserMw = require("@Mw/users/saveUser");

var directToMw = require("@Mw/utils/directTo");
var renderMw = require("@Mw/utils/render");
const directTo = require("middleware/utils/directTo");

module.exports = function (app) {
    
    var objectRepository = {
        taslModel: taskModel,
        commentModel: commentModel
    };

    app.get("/login",
        checkCredentialsMw(objectRepository),
        renderMw(objectRepository, "index")
    );

    app.get("/login/?err=:err_msg",
        renderMw(objectRepository, "index", "err_msg")
    );

    app.get("/",
        authMw(objectRepository),
        directToMw("/news")
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
        getUserMw(objectRepository),
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
        delUserMw(objectRepository)
    );

    app.post("/administration/open/from=:start_date&to=:end_date",
        authMw(objectRepository, "admin"),
        openDatesMw(objectRepository)
    );

    app.get("/administration/close/from=:start_date&to=:end_date",
        authMw(objectRepository, "admin"),
        closeDatesMw(objectRepository)
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
        getReservationMw(objectRepository),
        renderMw(objectRepository, "reservation_all")
    );

    app.get("/reservations/new",
        authMw(objectRepository),
        checkIfNotReservedMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservation_new")
    );

    app.post("/reservations/new",
        authMw(objectRepository),
        checkIfNotReservedMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservation_new")
    );

    app.get("/reservations/user/:userid",
        authMw(objectRepository),
        getUserReservationMw(objectRepository),
        saveReservationMw(objectRepository),
        renderMw(objectRepository, "reservation_own")
    );

    app.get("/reservations/del/:reservationid",
        authMw(objectRepository),
        checkPermissionMw(objectRepository),
        getReservationMw(objectRepository),
        delReservationMw(objectRepository)
    );

    app.post("/logout",
        logoutMw(objectRepository),
        directToMw(objectRepository, "/")
    );
};