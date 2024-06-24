import React , { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import axios from 'axios';
// import './a-home.css'; 
const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'https://downsouth-auth.onrender.com' || 'http://localhost:4001/api/v1/auth/login';

const AdminHome = () => {
    const user = useSelector(selectUser);
    const [destinationList, setDestinationList] = useState(<></>);
    const [username, setUsername] = useState('');
    const [disqualified, setDisqualified] = useState(false);
    const [disqualifingUser, setDisqualifingUser] = useState(<></>);


    // function call on start page
    const getDestinations = async () => {
        try {
            const response = await axios.get(`http://localhost:4004/api/v1/destination`, {
                headers: {
                    'x-access-token': user.token,
                }
            });
            console.log(response.data[0].images[0]);
            setDestinationList(<>
                <div className="destination-list">

                    {response.data.map((destination, index) => (
                        <div key={index} className="destination">
                            <Link to="/admin/a_update/:">{destination.name}</Link>
                            <p>{destination.description}</p>
                            {
                                destination.images.map((image, index) => (
                                    <img key={index} src={image} alt="destination" className="destination-image" />
                                ))
                            }

                        </div>
                    ))}
                </div>
            </>
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDestinations();
        // getDestinations();
    }, []); 
    
    // getDestinations();
    let name = 'null';

    const onChangeOfUsername = async (e) => {
        
        
        try {
            name = '';
            name = e.target.value;
            console.log(name);
            setDisqualifingUser(null);
            const response = await axios.get(`${AUTH_URL}/api/v1/auth/?username=${name}`, {
                headers: {
                    'x-access-token': user.token,
                }
            });

            
            
            setDisqualifingUser(
                <>
                    <p>Username: {response.data.username}</p>
                    <p>User Type: {response.data.user_type}</p>
                </>
            );
            console.log(response.data);

        }
        catch (error) {
            if(error.response.data.includes("Missing required fields"))
            {
                setDisqualifingUser(
                <>
                    
                </>);
            }
            if(error.response.data.includes("User not found"))
            {
                setDisqualifingUser(
                <>
                    <p>User not found</p>
                </>);
            }
            
        }
    }

    const handleDisqualify = async () => {
        console.log(username);
        try {
            const response = await axios.put(`${process.env.REACT_APP_AUTH_URL}/api/v1/auth/update`, {
                token: user.token,
                username: username,
                usertype: 'invalid',
                password: 'invalid',
            });
            setDisqualified(true);
            console.log("\tPassed => Update User");
            console.log("\t********************* \n");
        }
        catch (error) {
            console.error(error);
            console.log("\tFailed => Update User");
            console.log("\t********************* \n");
        }
    };

    return (
        <div className="admin-home">
            <div className="admin-background"></div>
            <div className="admin-nav-bar">
                <h1 className="admin-home-heading">Admin Home</h1>
                <div className="admin-home-links">
                    <Link to="/admin/a_create">Create</Link>
                    <Link to="/admin/a_update">Update</Link>
                </div>
            </div>
            <div className="admin-content">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        onChangeOfUsername(e);}
                    }
                    className="admin-home-input"
                    placeholder="Enter username"
                />
                
                  {disqualifingUser}
                    
                
                <button
                    onClick={handleDisqualify}
                    className="admin-home-button"
                >
                    Disqualify User
                </button>
                {disqualified && <p className="admin-home-message">User has been disqualified!</p>}
            </div>
            {destinationList}
        </div>
    );
};

export default AdminHome;