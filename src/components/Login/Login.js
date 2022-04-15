import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import logoPhoto from "../../images/google-logo.png";
import "./Login.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
  }

  const handleUserSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <div>
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleUserSignIn}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onBlur={handleEmailBlur}
              type="email"
              name=""
              id="email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onBlur={handlePasswordBlur}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <p style={{ color: "red" }}>{error?.message}</p>
          {loading && <p>Loading...</p>}
          <input className="form-submit" type="submit" value="Login" />
        </form>
        <p className="p-tag-style">
          New to Ema-John?{" "}
          <Link className="form-link" to="/signup">
            Create an account
          </Link>
        </p>
        <div className="or-div">
          <div className="or-div-line"></div>
          <div className="or-div-2">or</div>
          <div className="or-div-line"></div>
        </div>
        <button onClick={handleGoogleSignIn} className="google-btn-style">
          <img src={logoPhoto} alt="" />
          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
