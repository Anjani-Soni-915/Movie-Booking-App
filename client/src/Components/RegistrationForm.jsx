import React, { useState } from 'react';
import { signInWithGoogle } from './FirebaseConfig'; 
import axiosInterceptor from './AxiosInterceptor'; 
import googleImg from '../assets/gg2.png'

const RegistrationForm = ({ show, handleClose, onRegistrationSuccess, onLoginSuccess,openLoginForm }) => {
  if (!show) return null;

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axiosInterceptor.post('/users', formData);
      onRegistrationSuccess(response.data);
      handleClose();
    } catch (error) {
      const errorResponse = error.response?.data?.error || error.message;
      setErrorMessage(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const idToken = await user.getIdToken();
      const uid = user.uid;
      const email = user.email; 
  
      const response = await axiosInterceptor.post('/users/google-login', { uid, token: idToken, email, displayName: user.displayName });

      const { data, token } = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', token);
      onLoginSuccess(data);
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error signing in with Google:', error.message);
    } finally {
      setGoogleLoading(false);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>Welcome, Register here...</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button id="btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <span>Or</span>
        
        <button onClick={handleGoogleLogin} className="google-signin-button" disabled={googleLoading}>
        <img id="ggImg" src={googleImg}/>
          {googleLoading ? 'Logging in with Google...' : 'Sign in with Google'}
        </button>
        <a href="#" id="login" onClick={(e) => { e.preventDefault(); openLoginForm(); }}>
          Already Signed Up? Login
        </a>
      </div>
    </div>
  );
};

export default RegistrationForm;
