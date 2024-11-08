import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css'; // Import the CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state for form validation
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/[@$!%*?&#]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  // Handle sign-up submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Basic client-side validation
      if (!name || !email || !password || !phone) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // Validate phone number (must be exactly 10 digits)
      if (!/^\d{10}$/.test(phone)) {
        setError('Phone number must be exactly 10 digits.');
        setLoading(false);
        return;
      }

      // Validate password with detailed error messages
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        setLoading(false);
        return;
      }

      // Make a POST request to the backend signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign up successful!');
        navigate('/'); // Redirect to home page after successful sign-up
      } else {
        setError(data.message || 'Error during sign-up.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Error during sign-up.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="sign" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'} {/* Show loading state */}
          </button>
        </form>

        <a href="/signin" className="auth-link">Already have an account? Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
