import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import DonationForm from './components/DonationForm.jsx';
import RequestForm from './components/RequestForm.jsx';
import Listings from './components/Listings.jsx';
import Footer from './components/Footer.jsx';
import api from './api.js';

export default function App() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  async function load() {
    const d = await api.get('/api/donations');
    const r = await api.get('/api/requests');
    setDonations(d);
    setRequests(r);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="forms">
          <DonationForm onDone={load} />
          <RequestForm onDone={load} />
        </section>

        <section className="listings">
          <Listings donations={donations} requests={requests} onRefresh={load} />
        </section>
      </main>
      <Footer />
    </div>
  );
}