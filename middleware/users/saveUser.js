/**
 * Saves (create or edit) user.
 */
 module.exports = function (objectrepository) {

    return function (req, res) {
        // Database

        return res.redirect("/administration/edit/user/"+ req.params.userid +"/?succ=User-successfully-saved!");
    };

};