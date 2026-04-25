import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles.css";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await API.post("/auth/login", data);
            localStorage.setItem("token", res.data);
            alert("Login successful");
            navigate("/");
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Login</h2>

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

                <button onClick={handleSubmit}>Login</button>

                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/register")} className="text-blue cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}