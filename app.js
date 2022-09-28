const express = require("express");

const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

// app.get(path, callback);

app.get("/", (req, res, next) => {
    console.log("this is the homepage");
    // res.sendFile(__dirname + '/views/index.html');
    res.render("index");
});

app.get("/contact", (req, res, next) => {
    console.log("this is the contact page");
    // res.sendFile(__dirname + '/views/contact-page.html');
    res.render("contact-page")

});


app.get("/pizzas/margherita", (req, res, next) => {
    console.log("this is the Margherita page");
    // res.send("");
    // res.sendFile(__dirname + '/views/pizza-margherita.html');
    // res.render(path (, data));

    const data = {
        title: "Pizza Margherita",
        price: 8,
        imgFile: "pizza-margherita.webp",
        ingredients: ["mozzarella", "tomato sauce", "basilicum"]
    }

    res.render("pizza-page", data);

});


app.get("/pizzas/carbonara", (req, res, next) => {
    console.log("this is the Carbonara page");
    const data = {
        title: "Pizza Carbonara",
        price: 9,
        imgFile: "pizza-carbonara.jpg",
        ingredients: ["ham", "mozzarella", "tomato sauce", "basilicum",]
    }

    res.render("pizza-page", data);

});


app.get("/pizzas/funghi", (req, res, next) => {
    console.log("this is the Funghi page");
    const data = {
        title: "Pizza Funghi",
        price: undefined,
        imgFile: "pizza-funghi.jpg",
        ingredients: ["funghi", "mozzarella", "tomato", "basilicum"]
    
    }

    res.render("pizza-page", data);

});


app.listen(3000, () => console.log('My first app listening on port 3000! '));


