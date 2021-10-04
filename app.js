const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

const dbURI =
  "mongodb+srv://rishabh_singh:Rekha12345678@cluster0.yx8a6.mongodb.net/Node-blogs?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((res) => {
    // listen for requests
    app.listen(process.env.PORT || 3000);
    console.log("connected to db", res);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs',blogRoutes);

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
