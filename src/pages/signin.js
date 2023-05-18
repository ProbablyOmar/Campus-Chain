import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signin({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleUsernameChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogIn = e => {
    e.preventDefault();

    // Add Authentication
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <div>
      <div className="container mt-5">
        <form onSubmit={handleLogIn}>
          <div className="mb-3">
            <input
              autoComplete="off"
              autoFocus
              className="form-control mx-auto w-auto"
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control mx-auto w-auto"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Sign In"
          ></input>

          <br />
          <a href="/register">
            <button className="btn btn-primary m-2" type="button">
              Register
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Signin;
