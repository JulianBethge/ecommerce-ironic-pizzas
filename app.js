const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');

const Pizza = require("./models/Pizza.model");


const app = express();

app.use(express.static('public')); // Make everything inside of public/ available

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine


hbs.registerPartials(__dirname + "/views/partials"); // config partials



// 
// connect to DB
// 
mongoose
    .connect('mongodb://localhost/ironic-pizzas-db')
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => console.error('Error connecting to mongo', err));



//
// Routes
//

app.get("/", (req, res, next) => {
    console.log("this is the homepage");    
    // res.send("hello world");
    res.render("index");
});


app.get("/contact", (req, res, next) => {
    console.log("this is the contact page");
    res.render("contact-page");
});


app.get("/search", (req, res, next) => {

    // const maxPrice = req.query.maxPrice;
    let {maxPrice} = req.query;
    maxPrice = Number(maxPrice);


    Pizza.find({price: {$lte: maxPrice} })
        .then((pizzasFromDB) => {
            res.render("search", {pizzasArr: pizzasFromDB});
        })
        .catch((err) => {
            console.log("Error getting pizzas from DB", err)
        });
});

// GET /pizzas/margherita
// GET /pizzas/funghi
// GET /pizzas/something-else




app.get("/pizzas/:pizzaTitle", (req, res, next) => {

    const titleOfThePizza = req.params.pizzaTitle;
    
    Pizza.findOne({title: titleOfThePizza})
        .then((pizzaFromDB) => {
            if(pizzaFromDB === null) {
                res.send("sorry, no pizza with that name")
            } else {
                res.render("pizza-page", pizzaFromDB);
            }
        }).catch((err) => {
            console.log("Error getting pizza details from DB", err)
        });
    
})




// app.get("/pizzas/margherita", (req, res, next) => {
//     //res.send("hello")
//     //res.sendFile(__dirname + '/views/pizza-margherita.html');

//     // const data = {
//     //     title: "Pizza Margherita",
//     //     price: 8,
//     //     imgFile: "pizza-margherita.jpg",
//     //     ingredients: ["mozzarella", "tomato sauce", "basilicum"]
//     // }

//     Pizza.findOne({title: "margherita"})
//         .then((pizzaFromDB) => {
//             res.render("pizza-page", pizzaFromDB);
//         }).catch((err) => {
//             console.log("Error getting pizza details from DB", err)
//         });

    
// });


// app.get("/pizzas/carbonara", (req, res, next) => {

//     Pizza.findOne({title: "carbonara"})
//     .then((pizzaFromDB) => {
//         res.render("pizza-page", pizzaFromDB);
//     }).catch((err) => {
//         console.log("Error getting pizza details from DB", err)
//     });

//     // const data = {
//     //     title: "Pizza Carbonara",
//     //     price: 10,
//     //     imgFile: "pizza-carbonara.jpg"
//     // }

//     // res.render("pizza-page", data);
// });


// app.get("/pizzas/funghi", (req, res, next) => {

//     Pizza.findOne({title: "funghi"})
//     .then((pizzaFromDB) => {
//         res.render("pizza-page", pizzaFromDB);
//     }).catch((err) => {
//         console.log("Error getting pizza details from DB", err)
//     });

//     // const data = {
//     //     title: "Pizza Funghi",
//     //     imgFile: "pizza-funghi.jpg",
//     //     ingredients: ["funghi", "mozzarella", "tomato", "basilicum"]
//     // }

//     // res.render("pizza-page", data);
// });





app.listen(3000, () => console.log('My first app listening on port 3000! '));
