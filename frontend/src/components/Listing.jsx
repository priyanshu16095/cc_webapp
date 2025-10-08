import React from 'react';
import api from '../api.js';

export default function Listings({donations, requests, onRefresh}){
  async function markMatched(id){
    await api.post('/api/mark', { id, type: 'donation', value: { matched: true } });
    onRefresh && onRefresh();
  }

  async function markFulfilled(id){
    await api.post('/api/mark', { id, type: 'request', value: { fulfilled: true } });
    onRefresh && onRefresh();
  }

  return (
    <div>
      <div className="card">
        <h3>Recent Donations</h3>
        <div className="list">
          {donations.length === 0 && <div className="small">No donations yet</div>}
          {donations.map(d => (
            <div className="item" key={d.id}>
              <div><strong>{d.items}</strong></div>
              <div className="small">By: {d.name} • {d.contact}</div>
              <div className="small">Pickup pincode: {d.pickup_pincode}</div>
              <div className="small">Listed: {new Date(d.createdAt).toLocaleString()}</div>
              <div style={{marginTop:8}}>
                {!d.matched ? <button className="button" onClick={()=>markMatched(d.id)}>Mark matched / picked</button> : <span className="small">Matched</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Recent Requests</h3>
        <div className="list">
          {requests.length === 0 && <div className="small">No requests yet</div>}
          {requests.map(r => (
            <div className="item" key={r.id}>
              <div><strong>{r.neededItems}</strong></div>
              <div className="small">For: {r.orgName} • {r.contact}</div>
              <div className="small">Delivery pincode: {r.delivery_pincode}</div>
              <div className="small">Listed: {new Date(r.createdAt).toLocaleString()}</div>
              <div style={{marginTop:8}}>
                {!r.fulfilled ? <button className="button" onClick={()=>markFulfilled(r.id)}>Mark fulfilled</button> : <span className="small">Fulfilled</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}