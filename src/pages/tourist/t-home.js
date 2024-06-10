import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { Link } from 'react-router-dom';
import './t_home.css';
import { Card, CardContent, Typography, List, Button, Avatar, Box, Divider, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const T_Home = () => {
  const user = useSelector(selectUser);
  let tourist = null;

  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);

  const getTourist = async () => {
    try {
      tourist = await axios.get(`${process.env.REACT_APP_TOURIST_URL}/api/v1/tourists?username=${user.username}`);
      setName(tourist.data.name);
      setUsername(tourist.data.username);
      setCountry(tourist.data.country);
      setPhoneNumber(tourist.data.phone_number);
    } catch (error) {
      console.error("Error fetching tourist:", error);
    }
  };

  const getAppointment = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_APPOINTMENT_URL}/api/v1/appointment/search_with_username/${user.username}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getTourist();
    getAppointment();
  }, [user]);

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const isPastDate = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <Box className="layout">
      <Box className={`sidebar ${navOpen ? 'open' : ''}`}>
        <Button className="close-btn" onClick={toggleNav}>×</Button>
        <nav>
          <ul>
            <li>
              <Link to="/t_update" className="nav-link">Update Profile</Link>
            </li>
            <li>
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li>
              <Link to="/t_register" className="nav-link">Log out</Link>
            </li>
          </ul>
        </nav>
      </Box>
      <Box className={`content1 ${navOpen ? 'shift' : ''}`}>
        <Button className="open-btn" onClick={toggleNav}>☰</Button>
        <Box className="profile-box1" sx={{ p: 2, textAlign: 'center' }}>
          <Avatar src="https://via.placeholder.com/56" alt="Profile Icon" sx={{ width: 56, height: 56, mx: 'auto' }} />
          <Typography variant="h4" className="title" sx={{ mt: 1 }}>{username}</Typography>
          <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1"><strong>Email:</strong> {name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Country:</strong> {country}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Phone Number:</strong> {phoneNumber}</Typography>
          </Card>
        </Box>
      </Box>
      <Box className={`content3 ${navOpen ? 'shift' : ''}`}>
        <Box className="profile-box1" sx={{ p: 2 }}>
          <Typography variant="h4" className="title1">My Appointments</Typography>
          <List className='aplist' sx={{ mt: 2 }}>
            {appointments.map((appointment) => (
              <Card key={appointment.appointment_id} variant="outlined" sx={{ mb: 2, p: 2, transition: '0.3s', '&:hover': { boxShadow: 6 }, backgroundColor: isPastDate(appointment.date) ? '#f5f5f5' : '#e3f2fd' }} className="card-hover">
                <CardContent>
                  <Typography className="black-font" variant="h6">Appointment ID: {appointment.appointment_id}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <EventIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Date: {appointment.date}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <AccessTimeIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Time: {appointment.time}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <LocationOnIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Medical Center: {appointment.medical_center}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Doctor: {appointment.doctor}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Patient: {appointment.patient}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <DescriptionIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Description: {appointment.description}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default T_Home;
