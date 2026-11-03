import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        {
          user_id: userId,
          password,
          name,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Signup failed");
    }
  };

  return (
    <div className="create-card">
      <h2 className="section-label">Sign Up</h2>

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
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-publish" type="submit">
          Sign Up
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default SignUp;