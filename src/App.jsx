import { Routes, Route } from "react-router-dom";
import Register from './Register.jsx'
import Dashboard from "./Dashboard.jsx";
function App() {

  return (
    <div style={{
      position: 'absolute',
      height: "100%",
      width: "100%",
      boxSizing:"border-box",
      display: "flex",
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",

     }}>

      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

      </Routes>

    </div>
  )
}



export default App
