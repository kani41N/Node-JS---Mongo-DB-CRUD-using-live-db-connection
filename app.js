// const express = require("express");
// const app = express();
// const bodyparser = require("body-parser");
// const exhbs = require("express-handlebars");
// const dbo = require('./db');
// const ObjectID = dbo.ObjectID;

// app.engine('hbs', exhbs.engine({layoutsDir: 'views/', defaultLayout: "main", extname: "hbs"}))
// app.set('view engine', 'hbs');
// app.set('views', 'views');
// app.use(bodyparser.urlencoded({ extended: true })); 


// app.get('/', async (req, res) => {
//     let database = await dbo.getDatabase();
//     const collection = database.collection('books');
//     const cursor = collection.find({});
//     let books = await cursor.toArray();

//     let message = '';
//     let edit_id, edit_book;

//     if(req.query.edit_id && ObjectID.isValid(req.query.edit_id)){
//       edit_id = req.query.edit_id;
//       edit_book = await collection.findOne({_id: new ObjectID(edit_id)});
//     }

//     if(req.query.delete_id && ObjectID.isValid(req.query.delete_id)){
//        await collection.deleteOne({_id: new ObjectID(req.query.delete_id)});
//        return res.redirect('/?status=3');
//     }
  
//     switch (req.query.status) {
//         case '1':
//             message = "Inserted Successfully :)";
//             break;

//         case '2':
//                 message = "Updated Successfully :)";
//                 break;

//         case '3':
//                 message = "Deleted Successfully :)";
//                  break;
//         default:
//             break;
//     }

//     res.render('main', {message, books, edit_id, edit_book})
// });

// app.post('/store_book', async (req, res) => {
//     let database = await dbo.getDatabase();
//     const collection = database.collection('books');
//     let book = { title: req.body.title, author: req.body.author }
//     await collection.insertOne(book);
//     return res.redirect('/?status=1');
// })

// app.post('/update_book/:edit_id', async (req, res) => {
//     let database = await dbo.getDatabase();
//     const collection = database.collection('books');
//     let book = { title: req.body.title, author: req.body.author }
//     let edit_id = req.params.edit_id;

//     await collection.updateOne({_id:new ObjectID(edit_id)}, {$set:book});
//     return res.redirect('/?status=2');
// })

// app.listen(8000, () => {console.log('Listening to 8000 port'); });




//---------------------
//Mongoose DB connection 
//---------------------

// const express = require("express");
// const app = express();
// const bodyparser = require("body-parser");
// const exhbs = require("express-handlebars");
// const mongoose = require('mongoose');
// const dbo = require('./db');
// const BookModel = require('./models/booksModel');

// dbo.getDatabase();

// app.engine('hbs', exhbs.engine({
//     layoutsDir: 'views/', 
//     defaultLayout: "main", 
//     extname: "hbs",
//     runtimeOptions: {
//         allowProtoPropertiesByDefault: true,
//         allowProtoMethodsByDefault: true

//     }
// }))
// app.set('view engine', 'hbs');
// app.set('views', 'views');
// app.use(bodyparser.urlencoded({ extended: true })); 


// app.get('/', async (req, res) => {
//    let books = await BookModel.find({});

//     let message = '';
//     let edit_id, edit_book;

//     if(req.query.edit_id){
//       edit_id = req.query.edit_id;
//       edit_book = await BookModel.findOne({_id: edit_id})
//     }

//     if(req.query.delete_id){
//        await BookModel.deleteOne({_id: req.query.delete_id})
//        return res.redirect('/?status=3');
//     }
  
//     switch (req.query.status) {
//         case '1':
//             message = "Inserted Successfully :)";
//             break;

//         case '2':
//                 message = "Updated Successfully :)";
//                 break;

//         case '3':
//                 message = "Deleted Successfully :)";
//                  break;
//         default:
//             break;
//     }

//     res.render('main', {message, books, edit_id, edit_book})
// });

// app.post('/store_book', async (req, res) => {
//     const book = new BookModel({ title: req.body.title, author: req.body.author });
//     book.save();
//     return res.redirect('/?status=1');
// })

// app.post('/update_book/:edit_id', async (req, res) => {
//     let edit_id = req.params.edit_id;
//     await  BookModel.findOneAndUpdate({_id: edit_id}, { title: req.body.title, author: req.body.author });
//     return res.redirect('/?status=2');
// })

// app.listen(8000, () => {console.log('Listening to 8000 port'); });

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

(async () => {
    // Database connection
    let database;
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017'); 
    database = client.db('shop');

    if (!database) {
        console.log("Database not connected...!");
    } else {
        console.log("Database connected");
    }

    // Aggregation query
    const orders = await database.collection('orders').aggregate([
        {
            $lookup: {
                from: 'products',
                localField: "product_ids",
                foreignField: "_id",
                as: "products"
            }
        }
    ]).toArray();

    console.log(JSON.stringify(orders));

    // Close the connection
    await client.close(); // Close client after operations
})();

