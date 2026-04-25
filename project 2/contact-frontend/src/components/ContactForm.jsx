import { useState } from "react";
import API from "../api";

export default function ContactForm({ refresh }) {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (!data.name.trim()) {
            alert("Name is required");
            return;
        }

        try {
            await API.post("/contacts", data);
            setData({ name: "", phone: "", email: "", address: "" });
            refresh();
            alert("Contact added successfully!");
        } catch (err) {
            console.error("Error adding contact:", err);
            alert("Failed to add contact: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="card">
            <h3>Add Contact</h3>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                />

                <input
                    placeholder="Phone"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />

                <input
                    placeholder="Address"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
}