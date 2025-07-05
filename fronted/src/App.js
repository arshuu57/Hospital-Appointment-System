import './App.css';
import Login from './components/Login'
import Appointments from './components/Appointments'
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes >

      <Route path='/' element={<Register/>} />
         <Route path='/Login' element={<Login/>} />
            <Route path='/Appointments' element={<Appointments/>} />
            <Route path='/Dashboard' element={<Dashboard />} />
      </ Routes>
          </BrowserRouter>

   
    </div>
  );
}

export default App;
