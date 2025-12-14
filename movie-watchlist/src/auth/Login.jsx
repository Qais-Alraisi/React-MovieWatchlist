import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { setToken, setEmail: setCtxEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      const { token } = res.data;
      setToken(token);
      setCtxEmail(email);
      navigate('/watchlist');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
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
        <button type="submit" className="primary">Login</button>
      </form>
      <p className="muted">Don't have an account? <Link to="/register">Register</Link></p>
      {msg && <p className="error">{msg}</p>}
    </div>
  );
}
