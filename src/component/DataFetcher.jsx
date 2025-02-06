import React, { useState, useEffect } from "react";
import "./DataFetcher.css";
import { HashLoader } from 'react-spinners';

const DataFetcher = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        
        if (data.results && data.results.length > 0) {
          setUser(data.results[0]);
        } else {
          setError("No user data available");
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader"><HashLoader color="cyan" loading={loading} size={150} /> <p>Loading....</p>
  </div>

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card-container">
      {user && (
        <div className="card">
          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="user-image" />
          <div className="user-info">
            <h2>{user.name.first} {user.name.last}</h2>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default DataFetcher;