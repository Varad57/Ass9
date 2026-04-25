import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

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
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}