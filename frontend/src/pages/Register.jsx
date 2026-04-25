import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await API.post("/auth/register", data);
            alert("Registered successfully");
            navigate("/login");
        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="Username"
                onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <input
                placeholder="Email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}