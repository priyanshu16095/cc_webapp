const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const DATA_PATH = path.join(__dirname, 'data.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { donations: [], requests: [], volunteers: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Get all donations
app.get('/api/donations', (req, res) => {
  const data = readData();
  res.json(data.donations.reverse());
});

// Post a donation
app.post('/api/donations', (req, res) => {
  const { name, contact, items, pickup_pincode, notes } = req.body;
  if (!items || !pickup_pincode) return res.status(400).json({ error: 'items and pickup_pincode required' });
  const data = readData();
  const donation = {
    id: Date.now().toString(),
    name: name || 'Anonymous',
    contact: contact || '',
    items,
    pickup_pincode,
    notes: notes || '',
    createdAt: new Date().toISOString(),
    matched: false
  };
  data.donations.push(donation);
  writeData(data);
  res.json(donation);
});

// Get all requests
app.get('/api/requests', (req, res) => {
  const data = readData();
  res.json(data.requests.reverse());
});

// Post a request (household / NGO requesting food)
app.post('/api/requests', (req, res) => {
  const { orgName, contact, neededItems, delivery_pincode, notes } = req.body;
  if (!neededItems || !delivery_pincode) return res.status(400).json({ error: 'neededItems and delivery_pincode required' });
  const data = readData();
  const request = {
    id: Date.now().toString(),
    orgName: orgName || 'Requesting Household',
    contact: contact || '',
    neededItems,
    delivery_pincode,
    notes: notes || '',
    createdAt: new Date().toISOString(),
    fulfilled: false
  };
  data.requests.push(request);
  writeData(data);
  res.json(request);
});

// Simple match endpoint: find donations with same pincode
app.get('/api/match', (req, res) => {
  const { pincode } = req.query;
  if (!pincode) return res.status(400).json({ error: 'pincode required' });
  const data = readData();
  const nearbyDonations = data.donations.filter(d => d.pickup_pincode === pincode && !d.matched);
  res.json({ donations: nearbyDonations });
});

// Mark donation or request fulfilled/matched
app.post('/api/mark', (req, res) => {
  const { id, type, value } = req.body; // type: 'donation'|'request', value: fields to update
  const data = readData();
  const list = type === 'donation' ? data.donations : data.requests;
  const item = list.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  Object.assign(item, value);
  writeData(data);
  res.json(item);
});

// Volunteers registration
app.post('/api/volunteer', (req, res) => {
  const { name, contact, pincode } = req.body;
  if (!name || !contact) return res.status(400).json({ error: 'name and contact required' });
  const data = readData();
  const v = { id: Date.now().toString(), name, contact, pincode: pincode || '', createdAt: new Date().toISOString() };
  data.volunteers.push(v);
  writeData(data);
  res.json(v);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Backend listening on', port));
