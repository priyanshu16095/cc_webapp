const API = (base = 'http://localhost:4000') => ({
  async get(path) {
    const res = await fetch(base + path);
    return res.json();
  },
  async post(path, body) {
    const res = await fetch(base + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json();
  }
});

export default API();