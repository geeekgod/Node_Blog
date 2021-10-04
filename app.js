const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

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

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog",
    snippet: "About my Blog Snippet",
    body: "The body of my Blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("615b143ab9f49237ab49bcab")
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      // res.send(results);
      res.render("index", { title: "Home", blogs });
    })
    .catch((err) => {
      res.send(err);
      // res.render("index", { title: "Home", blogs });
    });
});

app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/create", (req, res) => {
  res.redirect("/blogs/create");
});

app.get("/create-blog", (req, res) => {
  res.redirect("/blogs/create");
});

// 404 page
app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
