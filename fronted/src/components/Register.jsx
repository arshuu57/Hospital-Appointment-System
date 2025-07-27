import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'patient' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <select onChange={e => setForm({...form, role: e.target.value})}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select><br/>
      <button type="submit">Register</button>
    </form>
  );
}