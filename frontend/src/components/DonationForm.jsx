import React, {useState} from 'react';
import api from '../api.js';

export default function DonationForm({onDone}){
  const [form,setForm] = useState({name:'',contact:'',items:'',pickup_pincode:'',notes:''});
  const [msg,setMsg] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      await api.post('/api/donations', form);
      setMsg('Thanks — donation listed.');
      setForm({name:'',contact:'',items:'',pickup_pincode:'',notes:''});
      onDone && onDone();
    }catch(err){ setMsg('Error: ' + (err.message || 'server')); }
  }

  return (
    <div className="card">
      <h3>Give Food / Donate</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Your name (optional)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Contact (phone/email)" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        <textarea className="input" placeholder="Items you're donating (eg. 20 meals, 10kg rice)" value={form.items} onChange={e=>setForm({...form,items:e.target.value})} />
        <input className="input" placeholder="Pickup pincode" value={form.pickup_pincode} onChange={e=>setForm({...form,pickup_pincode:e.target.value})} />
        <textarea className="input" placeholder="Notes (timing, dietary info)" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <div style={{display:'flex',gap:8}}>
          <button className="button" type="submit">List Donation</button>
          <div style={{alignSelf:'center',color:'#666'}}>{msg}</div>
        </div>
      </form>
    </div>
  );
}