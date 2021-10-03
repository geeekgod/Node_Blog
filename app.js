const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

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

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Title of an test blog. Title of an test blog.",
      snippet:
        "Lorem ispur dolor sit amet consectoruector. Lorem ispur dolor sit amet consectoruector.",
    },
    {
      title: "Title of an test blog. Title of an test blog. 2",
      snippet:
        "Lorem ispur dolor sit amet consectoruector. Lorem ispur dolor sit amet consectoruector.",
    },
    {
      title: "Title of an test blog. Title of an test blog. 3",
      snippet:
        "Lorem ispur dolor sit amet consectoruector. Lorem ispur dolor sit amet consectoruector.",
    },
  ];
  res.render("index", { title: "Home", blogs });
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
