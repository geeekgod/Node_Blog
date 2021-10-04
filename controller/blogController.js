const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index", { title: "Home", blogs });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  blog_index,
};
