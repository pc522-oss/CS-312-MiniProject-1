import axios from "axios";

function PostList({ posts, setEditingPost, currentUser }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        data: {
          user_id: currentUser?.user_id,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-card-inner">
            <h2 className="post-title">{post.title}</h2>

            <p className="post-body">{post.content}</p>

            <div className="post-meta-row">
              <div>
                <p className="author-name">By: {post.author}</p>

                <p className="post-date">Category: {post.category}</p>
              </div>

              <div>
                <button
                  className="btn-edit-card"
                  onClick={() => setEditingPost(post)}
                >
                  Edit
                </button>

                <button
                  className="btn-del-card"
                  onClick={() => handleDelete(post.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostList;
