import React, {useState} from 'react';
import api from '../api.js';

export default function RequestForm({onDone}){
  const [form,setForm] = useState({orgName:'',contact:'',neededItems:'',delivery_pincode:'',notes:''});
  const [msg,setMsg] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      await api.post('/api/requests', form);
      setMsg('Request submitted.');
      setForm({orgName:'',contact:'',neededItems:'',delivery_pincode:'',notes:''});
      onDone && onDone();
    }catch(err){ setMsg('Error'); }
  }

  return (
    <div className="card">
      <h3>Request Food / Register Need</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Organization / Name" value={form.orgName} onChange={e=>setForm({...form,orgName:e.target.value})} />
        <input className="input" placeholder="Contact" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        <textarea className="input" placeholder="What you need (eg. 50 meals, pulses)" value={form.neededItems} onChange={e=>setForm({...form,neededItems:e.target.value})} />
        <input className="input" placeholder="Delivery pincode" value={form.delivery_pincode} onChange={e=>setForm({...form,delivery_pincode:e.target.value})} />
        <textarea className="input" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <div style={{display:'flex',gap:8}}>
          <button className="button" type="submit">Submit Request</button>
          <div style={{alignSelf:'center',color:'#666'}}>{msg}</div>
        </div>
      </form>
    </div>
  );
}