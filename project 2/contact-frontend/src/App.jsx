import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactHome from "./pages/ContactHome";
import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContactHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;