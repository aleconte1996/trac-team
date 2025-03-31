import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const [rooms, setRooms] = useState([]); // State to store fetched rooms
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to store errors if any

  useEffect(() => {
    // Fetch rooms from the server
    const fetchRooms = async () => {
      try {
        // Endpoint for local backend running on port 3000
        const response = await fetch('http://localhost:3000/api/rooms'); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const data = await response.json();  // Parse the response as JSON
        setRooms(data);  // Store the rooms data in state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);  // Handle error
        setLoading(false);  // Set loading to false if there's an error
      }
    };

    fetchRooms();  // Call the function to fetch rooms when the component mounts
  }, []); // Empty dependency array to run the effect only once after component mounts

  if (loading) {
    return <p style={{ color: '#fff' }}>Loading rooms...</p>; // Loading state with white text
  }

  if (error) {
    return <p style={{ color: '#fff' }}>{error}</p>; // Error handling with white text
  }

  return (
    <div className="rooms-list">
      <h2 style={{ color: '#fff', textAlign: 'center' }}>Available Rooms</h2>
      <div className="rooms-list">
        {rooms.length === 0 ? (
          <p style={{ color: '#fff' }}>No rooms available</p> // Message when no rooms are found
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="room-item">
              <Link to={`/rooms/${room.id}`}>
                <button>{room.name}</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rooms;

