const express = require("express");

// express app
const app = express();

app.set("view engine", "ejs");

// listen for requests
app.listen(process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
