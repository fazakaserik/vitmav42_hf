/**
 * Gets user from database.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        // Mock
        res.locals.user = {
            _id: 42,
            first_name: "Erik",
            last_name: "Fazakas",
            email: "erik.fazakas@kuka.com",
            tel: "+36501227369",
            password: "valamijelszo"
        };

        return next();
    };

};