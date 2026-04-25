import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        API.get(`/posts/${id}`).then(res => setPost(res.data));
        API.get(`/posts/${id}/comments`).then(res => setComments(res.data));
    }, [id]);

    const addComment = async () => {
        await API.post(`/posts/${id}/comment`, { text });
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>

            <h3>Comments</h3>

            {comments.map(c => (
                <div className="card" key={c.id}>
                    {c.text}
                </div>
            ))}

            <input
                placeholder="Add comment"
                onChange={e => setText(e.target.value)}
            />
            <button onClick={addComment}>Post</button>
        </div>
    );
}