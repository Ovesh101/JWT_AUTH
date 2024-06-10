import  { useState, useEffect } from 'react';
import axios from 'axios'; // Use the configured Axios instance
import { Link } from 'react-router-dom';



const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get('http://localhost:3000/api/v1/dashboard' , config); // Change the endpoint as per your API
        console.log(response);
       
        setDashboardData(response.data.msg);
        setLoading(false);
       
        
      } catch (err) {
        if (err.response && err.response.status === 401) {
          
          setError('Unauthorized access. Please check your credentials.');
          setLoading(false);
        } else {
          setError('An error occurred. Please try again later.');
          setLoading(false)
          
        }
      
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div className='text-center text-3xl text-red-800' >{error}</div>;
    
  // }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     
     {error ? (
        <>
          <div className="text-center text-3xl text-red-800 mb-4">{error}</div>
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Back to Home
          </Link>
        </>
      ) : 
      (
      <div>
        <Link
        to="/"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Back to Home
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <div className="text-gray-700 text-center">
          {dashboardData ? (
            <p>Dashboard Data: {JSON.stringify(dashboardData)}</p>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      </div>
        
      )}
        </div>

  
      
  );
};

export default Dashboard;
