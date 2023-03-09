const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const app = express();

mongoose.connect(
    "mongodb+srv://qimi:qimibe123@amazon-clone.c8xzpsc.mongodb.net/?retryWrites=true&w=majority", 
    {useNewUrlParser: true, useUnifiedTopology: true,}, 
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connesct to the database");
        }
    }
);

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Retrive data from the server
app.get("/", (req, res) => {
    res.json("Hello amazon clone");
});
// Post - send data from  front to backend
app.post("/", (req, res) =>{
    console.log(req.body.name);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }else {
        console.log("Listing on PORT", 3000);
    }
});