/**
 * Saves (create or edit) user.
 */
 module.exports = function (objectrepository) {

    return function (req, res) {
        // Database

        return res.redirect("/administration/new_user"+"/?succ=User-successfully-saved!");
    };

};