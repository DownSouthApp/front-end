import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { useParams } from 'react-router-dom';
import './T_appointment.css';

const Appointment_Create = () => {
    const user = useSelector(selectUser);

    const timeAsString = (time) => {
        return time.toTimeString().split(' ')[0];
    }

    const appointment_id = user.username + timeAsString(new Date());

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [medical_center, setMedical_center] = useState("");
    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Appointment ID: ", appointment_id);
        console.log("Date: ", date);
        console.log("Time: ", time);
        console.log("Medical Center: ", medical_center);
        console.log("Doctor: ", doctor);
        console.log("Patient: ", patient);
        console.log("Description: ", description);
        console.log("User: ", user.username);

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPOINTMENT_URL}/api/v1/appointment`, {
                appointment_id: appointment_id,
                date: date,
                time: time,
                medical_center: medical_center,
                doctor: doctor,
                patient: patient,
                description: description,
                username: user.username,
            });
            console.log("Appointment created:", response.data);

            window.location.href = "/t_home";
        } catch (error) {
            console.error("Error creating appointment:", error);
        }
    }

    return (
        <div className="appointment-create-page1">
          <div className='background1'></div>
            <div className="form-container1">
                <h1 className="form-title1">Create Appointment</h1>
                <form className="appointment-form1" onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    <br />
                    <label>Time:</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    <br />
                    <label>Patient:</label>
                    <input type="text" value={patient} onChange={(e) => setPatient(e.target.value)} required />
                    <br />
                    <label>Medical Center:</label>
                    <input type="text" value={medical_center} onChange={(e) => setMedical_center(e.target.value)} required />
                    <br />
                    <label>Doctor:</label>
                    <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
                    <br />
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <br />
                    <button type="submit" className="submit-button1">Create </button>
                </form>
            </div>
        </div>
    );
};

export default Appointment_Create;