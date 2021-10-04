const express = require("express");
const blogController = require("../controller/blogController");
const Blog = require("../models/blogs");

const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", (req, res) => {
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

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((results) => {
      res.render("details", { blog: results, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
