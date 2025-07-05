import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ doctorId: '', date: '' });
  const [doctors, setDoctors] = useState([]);

  const fetchAppointments = () => {
    axios.get('http://localhost:5000/api/appointments', {
      headers: { Authorization: localStorage.getItem('token') },
    }).then(res => setAppointments(res.data));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/doctors', {
      headers: { Authorization: localStorage.getItem('token') },
    }).then(res => setDoctors(res.data));

    fetchAppointments();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/appointments', form, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    fetchAppointments();
  };

  const handleCancel = async (id) => {
    await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    fetchAppointments();
  };

  return (
    <div className="p-4">
      <h2>Book Appointment</h2>
      <form onSubmit={handleBook}>
        <select onChange={e => setForm({...form, doctorId: e.target.value})}>
          <option>Select Doctor</option>
          {doctors.map(doc => <option key={doc._id} value={doc._id}>{doc.username}</option>)}
        </select>
        <input type="datetime-local" onChange={e => setForm({...form, date: e.target.value})} />
        <button type="submit">Book</button>
      </form>

      <h3>My Appointments</h3>
      <ul>
        {appointments.map(a => (
          <li key={a._id}>
            {a.patientId.username} with {a.doctorId.username} on {new Date(a.date).toLocaleString()} ({a.status})
            {a.status === 'booked' && <button onClick={() => handleCancel(a._id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
