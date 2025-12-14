import React, { useState } from 'react';

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [year, setYear] = useState('');

  function reset() {
    setTitle('');
    setPoster('');
    setYear('');
  }

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title: title.trim(), poster: poster.trim(), year: year.trim() });
    reset();
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Poster URL (optional)" value={poster} onChange={(e) => setPoster(e.target.value)} />
      <input placeholder="Year (optional)" value={year} onChange={(e) => setYear(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
