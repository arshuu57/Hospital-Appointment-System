import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dash.css';

const API = process.env.REACT_APP_API_BASE;

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/users/doctors`, {
      headers: { Authorization: localStorage.getItem('token') },
    }).then(res => setDoctors(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map(doc => <li key={doc._id}>{doc.username}</li>)}
      </ul>
      <Link to="/appointments">Manage Appointments</Link>
    </div>
  );
}
