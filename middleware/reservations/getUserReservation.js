/**
 * Gets the given user's reservation from database.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        // Mock
        res.locals.reservations = [
            {
                date: "2022-10-23",
                user_id: 42,
                user_name: "Erik Fazakas"
            },
            {
                date: "2022-10-24",
                user_id: 42,
                user_name: "Erik Fazakas"
            },
            {
                date: "2022-10-25",
                user_id: 42,
                user_name: "Erik Fazakas"
            }
        ];

        return next();
    };

};