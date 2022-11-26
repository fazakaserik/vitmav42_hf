const authMw = require("../middleware/auth/auth");
const checkCredentialsMw = require("../middleware/auth/checkCredentials");
const logoutMw = require("../middleware/auth/logout");

const checkIfNotReservedMw = require("../middleware/reservations/checkIfNotReserved");
const delReservationMw = require("../middleware/reservations/delReservation");
const getReservationMw = require("../middleware/reservations/getReservation");
const getReservationsMw = require("../middleware/reservations/getReservations");
const getUserReservationMw = require("../middleware/reservations/getUserReservation");
const saveReservationMw = require("../middleware/reservations/saveReservation");

const checkPasswordMatchMw = require("../middleware/users/checkPasswordMatch");
const checkPermissionMw = require("../middleware/users/checkPermission");
const delUserMw = require("../middleware/users/delUser");
const getUserMw = require("../middleware/users/getUser");
const getUsersMw = require("../middleware/users/getUsers");
const saveUserMw = require("../middleware/users/saveUser");

const directToMw = require("../middleware/utils/directTo");
const renderMw = require("../middleware/utils/render");
const directTo = require("../middleware/utils/directTo");

const UserModel = require("../models/user");
const ReservationModel = require("../models/reservation");

module.exports = function (app) {
  const objectRepository = {
    UserModel: UserModel,
    ReservationModel: ReservationModel,
  };

  app.get(
    "/administration",
    authMw(objectRepository, "admin"),
    getUsersMw(objectRepository),
    renderMw(objectRepository, "administration")
  );

  app.get(
    "/administration/edit/user/:userid",
    authMw(objectRepository, "admin"),
    getUserMw(objectRepository),
    getUserReservationMw(objectRepository),
    renderMw(objectRepository, "administration_edit_user")
  );

  app.post(
    "/administration/edit/user/:userid",
    authMw(objectRepository, "admin"),
    (req, res, next) => {
      req.session.prev_url = "/administration/edit/user/" + req.body._id;
      return next();
    },
    checkPasswordMatchMw(objectRepository),
    saveUserMw(objectRepository),
    (req, res) => {
      res.redirect(
        "/administration/edit/user/" +
          req.body._id +
          "?succ=Successfully-saved!"
      );
    }
  );

  app.get(
    "/administration/del/user/:userid",
    authMw(objectRepository, "admin"),
    (req, res, next) => {
      req.session.prev_url = "/administration/edit/user/" + req.params.userid;
      return next();
    },
    checkPasswordMatchMw(objectRepository),
    delUserMw(objectRepository),
    directToMw(objectRepository, "administration")
  );

  app.get(
    "/administration/new_user",
    authMw(objectRepository, "admin"),
    renderMw(objectRepository, "administration_new_user")
  );

  app.post(
    "/administration/new_user",
    authMw(objectRepository, "admin"),
    checkPasswordMatchMw(objectRepository),
    saveUserMw(objectRepository),
    directToMw(objectRepository, "administration")
  );
};
