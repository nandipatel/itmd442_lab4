var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongo connection
var mongoose = require("mongoose");
const conn_str = 'mongodb+srv://npatel127:npatel127@cluster0.hzj7ktr.mongodb.net/contactdb?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(conn_str);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectDB;
connectDB();

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    notes: String,
    }, {timestamps: true});

var User = mongoose.model("users", userSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/add", (req, res) => {
    res.sendFile(__dirname + "/add.html");
});
app.get("/update", (req, res) => {
    res.sendFile(__dirname + "/update.html");
});
app.get("/delete", (req, res) => {
    res.sendFile(__dirname + "/delete.html");
});

//search user
app.get("/searchname", async (req, res) => {
    let firstName = [req.query.firstName || []].flat();
    let lastName = [req.query.lastName || []].flat();
    let query = {
        firstName: {
            "$in": firstName
        },
        lastName: {
            "$in": lastName
        }
    };
    User.find(query, function (err, foundEnvironment) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that env
            res.render("show", { environment: foundEnvironment });
        }
    });
});

//add user
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
            res.redirect("/");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

//update user

//delete user

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


