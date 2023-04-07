const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bodyParser = require("body-parser");
require("dotenv").config();

//Exporting date module which has the function "getDate()"
const date = require(__dirname + "/date.js");

const port = process.env.PORT;
const app = express();

//////////////////////////////////MongoDB//////////////////////////////////

//Connecting to Mongoose database
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

//Item Schema
const itemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

//Item Model
const Item = mongoose.model("Item", itemSchema);

const defaultItems = [];

//Custom List Schema
const listSchema = new mongoose.Schema({
  title: String,
  items: [itemSchema],
});

//Custom List Model
const List = mongoose.model("List", listSchema);
//////////////////////////////////////////////////////////////////////////

//To render using EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("main", {});
});
//Post request whenever a user type and add a new item and push it to the list
app.post("/", function (req, res) {
  const itemDescription = req.body.newItem;
  const listTitle = req.body.list;
  const day = date.getDate();

  const item = new Item({
    description: itemDescription,
  });

  if (listTitle === day) {
    item.save();
    res.redirect("/today");
  } else {
    List.findOne({ title: listTitle })
      .then((foundList) => {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Delete
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listTitle = req.body.listTitle;
  const day = date.getDate();

  if (listTitle === day) {
    Item.findByIdAndRemove(checkedItemId)
      .then(() => {
        console.log("Successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect("/today");
  } else {
    List.findOneAndUpdate(
      { title: listTitle },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then(() => {
        res.redirect("/" + listTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Linking javascript file for buttons functions
app.get("/button.js", function (req, res) {
  res.sendFile(__dirname + "/public/buttons.js");
});

//To buy list pages
app.get("/today", function (req, res) {
  const day = date.getDate();
  find();
  async function find() {
    await Item.find({})
      .then((foundItems) => {
        res.render("list", { listTitle: day, newListItems: foundItems });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Generate custom list pages
app.get("/:customListTitle", function (req, res) {
  const customListTitle = _.capitalize(req.params.customListTitle);

  List.findOne({ title: customListTitle })
    .then((foundList) => {
      if (!foundList) {
        //Create new list
        const list = new List({
          title: customListTitle,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListTitle);
      } else {
        //Show the existing list
        res.render("list", {
          listTitle: foundList.title,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      confirm.log(err);
    });
});

//Create a new list
app.post("/create", function (req, res) {
  let listTitle = req.body.newListTitle;

  res.redirect("/" + listTitle);
});

app.listen(port, function () {
  console.log("The server is on the port", port);
});
