const express = require("express");

// express app
const app = express();

app.set("view engine", "ejs");

// listen for requests
app.listen(process.env.PORT || 3000);

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

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
