var authMw = require("../middleware/auth/auth");
var checkCredentialsMw = require("../middleware/auth/checkCredentials");
var logoutMw = require("../middleware/auth/logout");

var openDatesMw = require("../middleware/dates/editDates");

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

const UserModel = require("../models/user");
const ReservationModel = require("../models/reservation");

module.exports = function (app) {
    
    const objectRepository = {
        UserModel: UserModel,
        ReservationModel: ReservationModel
      };

    app.get("/",
        authMw(objectRepository),
        directToMw(objectRepository, "news")
    );

    app.get("/login",
        renderMw(objectRepository, "login")
    );

    app.post("/login",
        checkCredentialsMw(objectRepository),
        directToMw(objectRepository, "")
    )

    app.get("/login/?err=:err_msg",
        renderMw(objectRepository, "login", "err_msg")
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
        renderMw(objectRepository, "profile")
    );

    app.post("/profile",
        authMw(objectRepository),
        getUserMw(objectRepository),
        checkPasswordMatchMw(objectRepository),
        saveUserMw(objectRepository),
        directToMw(objectRepository, "profile")
    );

    app.get("/logout",
        logoutMw(objectRepository),
        directToMw(objectRepository, "")
    );
};