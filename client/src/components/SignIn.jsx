import { useState } from "react";
import axios from "axios";

function SignIn({ onSuccess }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        user_id: userId,
        password,
      });

      setMessage(response.data.message);

      if (response.data.success) {
        onSuccess(response.data.user);
      }
    } catch (error) {
      console.error(error);
      setMessage("Signin failed");
    }
  };

  return (
    <div className="create-card">
      <h2 className="section-label">Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-publish" type="submit">
          Sign In
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default SignIn;
