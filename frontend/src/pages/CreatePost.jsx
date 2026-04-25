import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [data, setData] = useState({ title: "", content: "" });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await API.post("/posts", data);
            alert("Post created");
            navigate("/");
        } catch {
            alert("Error creating post");
        }
    };

    return (
        <div className="container">
            <h2>Create Blog Post</h2>

            <input
                placeholder="Title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />

            <textarea
                placeholder="Content"
                onChange={(e) => setData({ ...data, content: e.target.value })}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}