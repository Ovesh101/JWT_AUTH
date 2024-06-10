import { Route , Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"

function App() {
  

  return (
    <div>
    <Routes>
    <Route path="/dashboard" element={<Dashboard/>}/>
   
    <Route path="/" element={<Login/>}/>
  </Routes>
    </div>
  )
}

export default App
