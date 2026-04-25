import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogHome from "./pages/BlogHome";
import "./styles.css"
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogHome />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;