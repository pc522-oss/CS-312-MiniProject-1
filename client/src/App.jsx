import { useEffect, useState } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import BlogPostForm from "./components/BlogPostForm";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
    <main>
      <header className="navbar-custom">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="navbar-brand-text">
              React <span>Blog</span>
            </div>

            <div className="navbar-sub">Mini Project CRUD Application</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div className="navbar-pill">{posts.length} Posts</div>

              {currentUser && (
                <div className="navbar-pill">
                  Signed in as {currentUser.name}
                </div>
              )}
            </div>

            {!currentUser && (
              <button
                className="btn-publish"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            )}

            {currentUser ? (
              <button
                className="btn-del-card"
                onClick={() => {
                  setCurrentUser(null);
                  localStorage.removeItem("currentUser");
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="btn-publish"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        {showSignUp && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-hdr-edit">
                <span className="modal-title">Create Account</span>

                <button
                  className="btn-close"
                  onClick={() => setShowSignUp(false)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <SignUp />
              </div>
            </div>
          </div>
        )}

        {showSignIn && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-hdr-edit">
                <span className="modal-title">Sign In</span>

                <button
                  className="btn-close"
                  onClick={() => setShowSignIn(false)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <SignIn
                  onSuccess={(user) => {
                    setCurrentUser(user);

                    localStorage.setItem("currentUser", JSON.stringify(user));

                    setShowSignIn(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <BlogPostForm editingPost={editingPost} currentUser={currentUser} />

        <div className="posts-heading">
          Posts
          <span className="post-count-badge">{posts.length}</span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts have been created yet.</p>
          </div>
        ) : (
          <PostList posts={posts} setEditingPost={setEditingPost} />
        )}
      </div>

      <footer>
        <small>© 2026 Patrick's Blog</small>
      </footer>
    </main>
  );
}

export default App;
