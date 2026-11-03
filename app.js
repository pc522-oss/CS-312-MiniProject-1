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
let users = [];

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
    creatorId: req.body.creatorId,
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

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.creatorId !== req.body.user_id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  posts = posts.filter((post) => post.id !== postId);

  res.json({
    success: true,
  });
});

app.put("/api/posts/:id", (req, res) => {
  const postId = Number(req.params.id);

  const index = posts.findIndex((post) => post.id === postId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (posts[index].creatorId !== req.body.user_id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  posts[index] = {
    ...posts[index],
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
  };

  res.json({
    success: true,
    post: posts[index],
  });
});

app.post("/api/signup", (req, res) => {
  const { user_id, password, name } = req.body;

  const userExists = users.find((user) => user.user_id === user_id);

  if (userExists) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  users.push({
    user_id,
    password,
    name,
  });

  res.json({
    success: true,
    message: "Signup successful",
  });
});

app.post("/api/signin", (req, res) => {
  const { user_id, password } = req.body;

  const user = users.find(
    (u) => u.user_id === user_id && u.password === password,
  );

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  res.json({
    success: true,
    message: "Signin successful",
    user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
