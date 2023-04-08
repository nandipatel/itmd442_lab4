var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://npatel127:npatel127@cluster0.hzj7ktr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//mongoose.connect("mongodb://localhost:27017/contact_db");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email_add: String,
    notes: String,
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/add.html");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/delete.html");
});

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

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


