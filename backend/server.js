const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/appointmentSystem";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Hospital Appointment System Backend is Live');
});
