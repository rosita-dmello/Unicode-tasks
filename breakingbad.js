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
app.get("/breakingbad", function(req,res){
  fetch("https://breakingbadapi.com/api/characters?category=Breaking+Bad")
    .then(response => response.json())
    .then(data => res.send(data));
});
app.get("/bettercallsaul", function(req,res){
  fetch("https://breakingbadapi.com/api/characters?category=Better+Call+Saul")
    .then(response => response.json())
    .then(data => res.send(data));
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
  console.log(newCharacter);
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
