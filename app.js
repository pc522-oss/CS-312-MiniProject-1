const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  const filter = req.query.filter;
  let filteredPosts = posts;

  if (filter) {
    filteredPosts = posts.filter((p) => p.category === filter);
  }

  res.render("index", { posts: filteredPosts, filter });
});

app.post("/new", (req, res) => {
  const newPost = {
    id: Date.now(),
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.redirect("/?success=1");
});

app.post("/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === postId);

  if (index === -1) return res.redirect("/");

  posts[index] = {
    ...posts[index],
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
  };

  res.redirect("/?success=1");
});

app.post("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.filter((p) => p.id !== postId);

  res.redirect("/?success=1");
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const newPost = {
    id: Date.now(),
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    createdAt: new Date(),
  };

  posts.push(newPost);

  res.json({
    success: true,
    post: newPost,
  });
});

app.delete("/api/posts/:id", (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.filter((post) => post.id !== postId);

  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});