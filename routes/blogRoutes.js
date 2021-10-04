const express = require("express");
const blogController = require("../controller/blogController");
const Blog = require("../models/blogs");

const router = express.Router();

router.get("/", blogController.blog_index);

router.get("/:id", blogController.blog_details);

router.post("/", blogController.blog_create);

router.get("/create", blogController.blog_create_render);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
