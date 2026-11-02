import axios from "axios";

function PostList({ posts, setEditingPost }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By: {post.author}</p>
          <p>Category: {post.category}</p>

          <button onClick={() => setEditingPost(post)}>Edit</button>

          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default PostList;
