import { useState, useEffect } from "react";
import axios from "axios";

function BlogPostForm({ editingPost, currentUser }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setAuthor(editingPost.author);
      setTitle(editingPost.title);
      setCategory(editingPost.category);
      setContent(editingPost.content);
    }
  }, [editingPost]);

  useEffect(() => {
    if (!editingPost && currentUser) {
      setAuthor(currentUser.name);
    }
  }, [currentUser, editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingPost) {
        response = await axios.put(
          `http://localhost:3000/api/posts/${editingPost.id}`,
          {
            author,
            title,
            category,
            content,
          },
        );
      } else {
        response = await axios.post("http://localhost:3000/api/posts", {
          author,
          title,
          category,
          content,
        });
      }

      console.log(response.data);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="create-card" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        className="form-control"
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="form-control"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Education">Education</option>
      </select>

      <div className="editor-section">
        <label className="form-label">Content</label>

        <textarea
          className="form-control editor-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);

            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>

      <button className="btn-publish" type="submit">
        {editingPost ? "Update Post" : "Publish Post"}
      </button>
    </form>
  );
}

export default BlogPostForm;
