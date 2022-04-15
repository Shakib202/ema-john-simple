import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import logoPhoto from "../../images/google-logo.png";
import './SignUp.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordBlur = event => {
    setConfirmPassword(event.target.value);
  }

  if(user){
    navigate('/shop');
  }

  const handleCreateUser = event => {
    event.preventDefault();
    if(password !== confirmPassword){
      setError('Your two passwords did not match');
      return;
    }
    if(password.length < 6){
      setError('Password must be 6 characters or longer');
      return;
    }
    createUserWithEmailAndPassword(email, password);
  }

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
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleCreateUser}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onBlur={handleEmailBlur} type="email" name="" id="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onBlur={handlePasswordBlur} type="password" name="password" id="password" required />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input onBlur={handleConfirmPasswordBlur} type="password" name="confirmPassword" id="confirm-password" required />
          </div>
          <p style={{color: 'red'}}>{error}</p>
          <input className="form-submit" type="submit" value="Sign Up" />
        </form>
        <p className="p-tag-style">
          Already have an account? <Link className="form-link" to="/login">Login</Link>
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

export default SignUp;