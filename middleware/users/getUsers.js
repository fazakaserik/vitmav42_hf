/**
 * Gets users from database.
 */
 module.exports = function (objectrepository) {

    return function (req, res, next) {

        // Mock
        res.locals.users = [
            {
                _id: 42,
                first_name: "Erik",
                last_name: "Fazakas",
                email: "erik.fazakas@kuka.com",
                tel: "+36501227369"
            },
            {
                _id: 24,
                first_name: "Mark",
                last_name: "Zuckerberg",
                email: "mark.zuckerberg@facebook.com",
                tel: "202-555-0166"
            },
            {
                _id: 5,
                first_name: "The",
                last_name: "Rock",
                email: "the.rock@wwe.com",
                tel: "+1-202-555-0166"
            }
        ];

        return next();
    };

};