import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles.css";

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
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Registration failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>

                <input
                    placeholder="Username"
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />

                <button onClick={handleSubmit}>Register</button>

                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-blue cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}