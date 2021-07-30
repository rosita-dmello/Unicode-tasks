const express = require('express');
const app = express();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected!");
});
mongoose.connect('mongodb://localhost:27017/breakingbadDB', {useNewUrlParser: true, useUnifiedTopology: true});

const characterSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  birthday: String,
  occupation: [String],
  img: String,
  status: String,
  nickname: String,
  appearance: [Number],
  portrayed: String,
  category: [String]

});
const Character = mongoose.model('Character', characterSchema);
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.get("/breakingbad", async function(req,res){
  try {
  const response = await fetch("https://breakingbadapi.com/api/characters?category=Breaking+Bad");
  const data = await response.json();
  res.send(data);
  }
  catch(error) {
    console.log(error);
  }
console.log(req.statusCode);
});

app.get("/bettercallsaul", async function(req,res){
  try {
  const response = await fetch("https://breakingbadapi.com/api/characters?category=Better+Call+Saul");
  const data = await response.json();
  res.send(data);
  console.log(req.statusCode);
  }
  catch(error) {
    console.log(error);
  }

});
var database = [];
app.get("/database", function(req,res){


Character.find({}, function(err, characters){
      if(!err){
        database = characters;
      }
      else {
        console.log(err);
      }
    });
    // res.write("Successfully Deleted Character!"); //(another method to show the database in JSON format)
    // res.write(JSON.stringify(database));
    // res.send();
    res.send(database);
});

app.post("/delete", function(req,res) {
  const id = req.body.idToDelete;
  Character.deleteOne({_id: id}, function(err){
    if (!err) {
      res.redirect("/database");
    }
    else {
      console.log(err);
    }
  });
});
app.post("/update", function(req,res) {
  const id = req.body.idToUpdate;
  const attr = req.body.attributeToUpdate;
  const value = req.body.valueToUpdate;
  Character.updateOne({_id: id},{attr: value},function(err){
    if (!err) {
      res.redirect("/database");
    }
    else {
      console.log(err);
    }
  });
});
app.post("/", function(req,res){
  const newCharacter = new Character({
    _id: req.body.id,
    name: req.body.name,
    birthday: req.body.birthday,
    occupation: req.body.occupation,
    img: req.body.image,
    status: req.body.status,
    nickname: req.body.nickname,
    appearance: req.body.appearance,
    portrayed: req.body.portrayed,
    category: req.body.category

  });

  newCharacter.save(function(err){
    if(!err){
      res.redirect("/");
    }
    else {
      console.log(err);
    }
  }
);

});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
