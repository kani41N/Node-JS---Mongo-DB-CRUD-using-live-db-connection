// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;
// let database;

// async function getDatabase() {
//     const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
//     database = client.db('library');

//     if (!database){
//         console.log('Database not connected!');
//     }

//     return database;  
// }

// module.exports = {
//     getDatabase,
//     ObjectID
// }



// ----------------------------------
// Atlas using live db connection - Mongoose DB Connection 
// ----------------------------------

const mongoose = require('mongoose');

async function getDatabase(){
    mongoose.connect('mongodb+srv://anusiya:'+encodeURIComponent('Test@123')+'@cluster0.ax5yp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Dadabase connected :)')
    }).catch((err) => {
       console.log('Database connection error!', err)
    })
}

module.exports = {
    getDatabase
}


