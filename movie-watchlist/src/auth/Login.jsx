import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { setToken, setUsername: setCtxUsername } = useContext(AuthContext);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setMsg(data.message || 'Login failed');
        return;
      }
      const { token } = await res.json();
      setToken(token);
      setCtxUsername(username);
    } catch (err) {
      setMsg('Network error');
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  );
}
