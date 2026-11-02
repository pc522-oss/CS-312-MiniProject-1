import { useEffect, useState } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import BlogPostForm from "./components/BlogPostForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>React Blog Frontend</h1>

      <BlogPostForm editingPost={editingPost} />

      <PostList posts={posts} setEditingPost={setEditingPost} />
    </div>
  );
}

export default App;
