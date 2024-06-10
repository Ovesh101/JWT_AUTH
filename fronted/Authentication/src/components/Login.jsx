
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";




const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
   const token = localStorage.getItem('token')
    const [error, setError] = useState('');

    const handleSubmit = async  (e)=>{
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:3000/api/v1/login" , {
                username,
                password
            });
    
            const { token } = response.data;
            
      
          localStorage.setItem('token', token);

          window.location.href = "/dashboard";
          
            
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
              } else {
                setError('An error occurred. Please try again.');
              }
            
        }
     

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        
        {token ? (
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Go to Dashboard because your token exists
        </Link>
      ) : (
        <p className="text-red-500">Token is not there</p>
      )}
      </div>
    </div>
  )
}

export default Login