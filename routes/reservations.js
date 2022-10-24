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

module.exports = function (app) {
    
    var objectRepository = {
        taskModel: "taskModel",
        commentModel: "commentModel",
        userModel: "userModel"
      };

    app.get("/reservations/all",
        authMw(objectRepository),
        getReservationsMw(objectRepository),
        renderMw(objectRepository, "reservations_all")
    );

    app.get("/reservations/new",
        authMw(objectRepository),
        renderMw(objectRepository, "reservations_new")
    );

    app.post("/reservations/new",
        authMw(objectRepository),
        checkIfNotReservedMw(objectRepository),
        saveReservationMw(objectRepository)
    );

    app.get("/reservations/user/:userid",
        authMw(objectRepository),
        getUserMw(objectRepository),
        getUserReservationMw(objectRepository),
        renderMw(objectRepository, "reservations_own")
    );

    app.post("/reservations/del/:reservationid",
        authMw(objectRepository),
        checkPermissionMw(objectRepository),
        delReservationMw(objectRepository) // This should redirect back to the user page
    );

};