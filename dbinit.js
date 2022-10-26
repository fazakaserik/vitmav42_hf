const mongoose = require("mongoose");

const UserModel = require("./models/user");
const ReservationModel = require("./models/reservation");

function initUser(data) {
    let userInst = new UserModel();
    userInst.first_name = data.first_name;
    userInst.last_name = data.last_name;
    userInst.email = data.email;
    userInst.tel = data.tel;
    userInst.username = data.username;
    userInst.password = data.password;
    userInst.save((err)=>{
        if (err) {
            console.log(err);
        }
        for (reservation_index in data.reservations){
            let reservationInst = new ReservationModel();
            reservationInst.date = data.reservations[reservation_index];
            reservationInst.name = "Demo reservation";
            reservationInst._reserver = userInst;
            reservationInst.save((err)=>{
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

function initUsers(datas) {
    for (data_index in datas) {
       initUser(datas[data_index]);
    }
}

// Clean database
mongoose.connect('mongodb://localhost/S3VI5U',function(){
    /* Drop the DB */
    mongoose.connection.db.dropDatabase(function(){
        // Init database
        initUsers([
            {
                first_name: "Erik",
                last_name: "Fazakas",
                email: "erik.fazakas@kuka.com",
                tel: "+36501227369",
                username: "admin",
                password: "admin",
                reservations: [
                    "2022-10-25", 
                    "2022-10-26", 
                    "2022-10-27"
                ]
            },
            {
                first_name: "Mark",
                last_name: "Zuckerberg",
                email: "mark.zuckerberg@facebook.com",
                tel: "202-555-0166",
                username: "markz",
                password: "passofmark",
                reservations: [
                    "2022-11-01", 
                    "2022-11-02"
                ]
            },
            {
                first_name: "The",
                last_name: "Rock",
                email: "the.rock@wwe.com",
                tel: "(555) 555-1234",
                username: "ther",
                password: "passofthe",
                reservations: [
                    "2022-09-21", 
                    "2022-09-22", 
                    "2022-05-01", 
                    "2022-05-02", 
                    "2022-05-03"
                ]
            }
        ]);
    });
});