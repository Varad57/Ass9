import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function BlogHome() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/posts").then(res => setPosts(res.data));
    }, []);

    return (
        <div className="container">
            <h2>All Blogs</h2>

            {posts.map(p => (
                <div
                    key={p.id}
                    className="card"
                    onClick={() => navigate(`/post/${p.id}`)}
                >
                    <h3>{p.title}</h3>
                    <p>{p.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}