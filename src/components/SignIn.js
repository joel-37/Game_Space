import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Auth.css'; // Import the CSS

const SignIn = ({ handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Basic email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate form fields
  const isFormValid = () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return false;
    }
    if (password.trim() === '') {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error

    if (!isFormValid()) {
      setLoading(false);
      return;
    }

    try {
      // Send request to the backend
      const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.data.message) {
        // Handle success
        alert(res.data.message); // Display success message
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication flag

        handleSignIn(); // Update sign-in state in the parent component
        setEmail(''); // Clear email
        setPassword(''); // Clear password
        navigate('/'); // Redirect to home page after successful sign-in
      }
    } catch (err) {
      // Enhanced error logging and feedback
      console.error('SignIn error:', err);

      if (err.response) {
        // Check if error response is from the backend
        if (err.response.data.message) {
          setError(err.response.data.message); // Display error from backend
        } else {
          setError('Error signing in. Please try again.'); // Generic error message
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>} {/* Display errors if any */}
          
          <button className="sign" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'} {/* Show loading message */}
          </button>
        </form>
        <a href="/signup" className="auth-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default SignIn;
