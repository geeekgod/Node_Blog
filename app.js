const express = require("express");

// express app
const app = express();

app.set("view engine", "ejs");

// listen for requests
app.listen(process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
    res.render("404");
});
