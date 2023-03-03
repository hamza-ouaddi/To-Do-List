const express = require("express");
const bodyParser = require("body-parser");

//Exporting date module which has the function "getDate()"
const date = require(__dirname + "/date.js");

const port = 3000;
const app = express();

//The item that added by the user
const items = [];
const workItems = [];

//To render using EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("main", { listTitle: "To Do List" });
});
//Post request whenever a user type and add a new item and push it to the list
app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/tobuy");
  }
});

//Linking javascript file for buttons functions
app.get("/button.js", function (req, res) {
  res.sendFile(__dirname + "/public/buttons.js");
});

//To buy list pages
app.get("/tobuy", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

//Work list page
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

//About page
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log("The server is on the port", port);
});
