import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory stores
const users = {}; // email -> { email, password }
const movies = {}; // email -> [ movie ]
let nextId = 1;

app.post('/api/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (users[email]) return res.status(409).json({ message: 'User already exists' });
  users[email] = { email, password };
  movies[email] = [];
  return res.status(201).json({ message: 'Registered' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = users[email];
  if (!user || user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
  // return a fake token that includes the email
  const token = `fake-token:${email}`;
  return res.json({ token });
});

// auth middleware
function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const parts = h.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Missing token' });
  const token = parts[1];
  if (!token.startsWith('fake-token:')) return res.status(401).json({ message: 'Invalid token' });
  const email = token.slice('fake-token:'.length);
  if (!users[email]) return res.status(401).json({ message: 'Unknown user' });
  req.userEmail = email;
  next();
}

app.get('/api/movies', auth, (req, res) => {
  const list = movies[req.userEmail] || [];
  res.json({ movies: list });
});

app.post('/api/movies', auth, (req, res) => {
  const { title, poster, year } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ message: 'Title required' });
  const movie = { id: nextId++, title: title.trim(), poster: poster || '', year: year || '', watched: false };
  movies[req.userEmail].unshift(movie);
  res.status(201).json({ movie });
});

app.put('/api/movies/:id', auth, (req, res) => {
  const id = Number(req.params.id);
  const list = movies[req.userEmail] || [];
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Movie not found' });
  const updated = { ...list[idx], ...req.body };
  list[idx] = updated;
  res.json({ movie: updated });
});

app.delete('/api/movies/:id', auth, (req, res) => {
  const id = Number(req.params.id);
  let list = movies[req.userEmail] || [];
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Movie not found' });
  list.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Mock API server listening on ${PORT}`));
