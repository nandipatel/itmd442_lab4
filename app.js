var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    email_add: String,
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

//add user
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

//search user
app.post("/searchname", async (req, res) => {
    let collection = await db.collection("users");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


