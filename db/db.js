const mongoose = require('mongoose');


function dbconection(){
    const dbURI="mongodb+srv://user2:user2@skk.z31bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // const dbURI='mongodb+srv://user2:bcsCk69RZtOc63j1@skk.gaxdq.mongodb.net/arsfutura?retryWrites=true&w=majority';

    mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => console.log('connect to db'))
        .catch((err) => console.log(err));
};

module.exports = {dbconection};
