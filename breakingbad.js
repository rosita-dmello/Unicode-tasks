// Initial code to require modules and set up Express

const express = require('express');
const app = express();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Setting up Mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected!");
});
mongoose.connect('mongodb://localhost:27017/breakingbadDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Creating a Schema and Model for the Database
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

// Express REST APIs

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
  console.log("statusCode on loading root page: " + res.statusCode);
});

// GET request to breakingbad route
app.get("/breakingbad", async function(req,res){
  try {
  const response = await fetch("https://breakingbadapi.com/api/characters?category=Breaking+Bad");
  const data = await response.json();
  res.send(data);
  }
  catch(error) {
    console.log(error);
  }
console.log("statusCode on fetching Breaking Bad Data: " + res.statusCode);
});

// GET request to bettercallsaul route
app.get("/bettercallsaul", async function(req,res){
  try {
  const response = await fetch("https://breakingbadapi.com/api/characters?category=Better+Call+Saul");
  const data = await response.json();
  res.send(data);
  console.log("statusCode on fetching Better Call Saul Data: " + res.statusCode);
  }
  catch(error) {
    console.log(error);
  }
});

//GET request to database route to display existing database
var database = [];
app.get("/database",async function(req,res){

await Character.find({}, function(err, characters){
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
    console.log("statusCode: " + res.statusCode);
});

// POST request to delete route to delete a character
app.post("/delete", function (req,res) {
  const id = req.body.idToDelete;
  Character.deleteOne({_id: id}, function(err){
    if (!err) {
      res.redirect("/database"); //Display Database once done
    }
    else {
      console.log(err);
    }
  });
});

// POST request to update route to update character attributes
app.post("/update", function(req,res) {
  const name = req.body.nameToUpdate;
  const attr = req.body.attributeToUpdate;
  const value = req.body.valueToUpdate;
  console.log(name,attr,value);
  if (attr == "occupation" || attr == "category" || attr == "appearance") {
     Character.updateOne({name: name}, {$push:{[attr]: value}} ,{new:true},function(err){
       if (!err) {
         res.redirect("/database");
       }
       else {
         console.log(err);
       }
     });
  }
  else {
  Character.updateOne({name: name}, {$set:{[attr]: value}} ,{new:true},function(err){
    if (!err) {
      res.redirect("/database"); //Display Database once done
    }
    else {
      console.log(err);
    }
  });
}
  console.log("statusCode: " + res.statusCode);
});

// POST request to root route to add a new character to database
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

// Listen on port 3000
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
