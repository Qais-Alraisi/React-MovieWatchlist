import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const { token, setToken, setEmail: setCtxEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/watchlist');
    }
  }, [token, navigate]);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (password !== confirm) return setMsg('Passwords do not match');
    try {
      await axios.post('http://localhost:4001/api/register', { email, password });
      const loginRes = await axios.post('http://localhost:4001/api/login', { email, password });
      const { token } = loginRes.data;
      setToken(token);
      setCtxEmail(email);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="auth-card">
      <h1>🎥 Movie Watchlist</h1>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Confirm Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        <button type="submit" className="primary">Create Account</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      {msg && <p className="error">{msg}</p>}
    </div>
  );
}
