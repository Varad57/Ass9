import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ContactForm from "../components/ContactForm";
import "../styles.css";

export default function ContactHome() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const res = await API.get(`/contacts?search=${search}&page=${page}`);
            setContacts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            }
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchContacts();
        }
    }, [page, navigate]);

    const deleteContact = async (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            await API.delete(`/contacts/${id}`);
            fetchContacts();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <div className="header-section">
                <h2>📇 Contact Book</h2>
                <button className="secondary" onClick={handleLogout}>Logout</button>
            </div>

            <div className="search-section">
                <input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={fetchContacts}>Search</button>
            </div>

            <div className="main-content">
                <div className="form-column">
                    <ContactForm refresh={fetchContacts} />
                    
                    <div className="card mt-4">
                        <h3>Actions</h3>
                        <div className="flex flex-col gap-2">
                            <button className="secondary" onClick={() => window.open(`http://localhost:5000/api/contacts/export?token=${localStorage.getItem("token")}`)}>
                                📤 Export CSV
                            </button>
                            <div className="flex flex-col gap-2">
                                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Import Contacts</label>
                                <input
                                    type="file"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        
                                        try {
                                            await API.post("/contacts/import", formData);
                                            alert("Imported successfully!");
                                            fetchContacts();
                                        } catch (err) {
                                            alert("Import failed: " + (err.response?.data || err.message));
                                        }
                                        e.target.value = ""; // Reset input
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list-column">
                    <div className="contacts-grid">
                        {contacts.length > 0 ? contacts.map((c) => (
                            <div className="contact-card" key={c.id}>
                                <div>
                                    <h3>{c.name}</h3>
                                    <p>📞 {c.phone}</p>
                                    <p>✉️ {c.email}</p>
                                    <p>📍 {c.address}</p>
                                </div>
                                <div className="actions">
                                    <button className="danger" onClick={() => deleteContact(c.id)}>Delete</button>
                                </div>
                            </div>
                        )) : <p>No contacts found.</p>}
                    </div>

                    <div className="pagination">
                        <button 
                            className="secondary" 
                            disabled={page <= 1}
                            onClick={() => setPage(Math.max(1, page - 1))}
                        >
                            Previous
                        </button>
                        <span style={{alignSelf: 'center'}}>Page {page}</span>
                        <button 
                            className="secondary" 
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}