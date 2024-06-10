import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from './a-update.json'; 
import './a-update.css'; 

const A_Update = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("try to update destination");
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const blob = new Blob([reader.result], { type: 'image/jpeg' });
                const formData = new FormData();
                formData.append('name', 'Sample Destination1');
                formData.append('file', blob, 'source.jpg');
                const response = await axios.post(`${process.env.REACT_APP_DESTINATION_URL}/api/v1/destination/`, formData, {  headers: {
                        'Content-Type': 'multipart/form-data' 
                    }
                });
                console.log(response);
                window.location.href = '/a_home';
                console.log("\tPassed => Update Destination");
                console.log("\t****************************** \n");
            };
            reader.onerror = () => {
                console.error("Error reading file:", reader.error);
                console.log("\tFailed => Update Destination");
            };
            reader.readAsArrayBuffer(image);
        } catch (error) {
            console.error("Error reading file:", error);
            console.log("\tFailed => Update Destination");
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="update-page">
            <div className="form-container">
                <div className="form-inner">
                    <h1 className="form-header">Update Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange} required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange} required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange} required
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="animation-container">
                <Lottie options={defaultOptions} height="100%" width="100%" />
            </div>
        </div>
    );
};

export default A_Update;