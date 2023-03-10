const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const User = require("./models/user");

dotenv.config();

const app = express();

mongoose.connect(
    process.env.DATABASE, 
    {useNewUrlParser: true, useUnifiedTopology: true,}, 
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to the database");
        }
    }
);


//Middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }else {
        console.log("Listing on PORT", 3000);
    }
});