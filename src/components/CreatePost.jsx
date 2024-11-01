import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreatePost = ({onAddPost}) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Draft");
    const [time, setTime] = useState(new Date().toLocaleString());
    const navigate = useNavigate();

    const handleNavi = () => {
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const newId = savedPosts.length > 0 ? savedPosts[savedPosts.length - 1].id + 1 : 1;

        const newPost = {
            id: newId,
            title,
            status,
            time,
        };

        const updatedPosts = [...savedPosts, newPost];
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        onAddPost(newPost);

        // Formani tozalash
        setTitle("");
        setStatus("Draft");
        setTime(new Date().toLocaleString());
    };

    return (
        <div className="max-w-3xl bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Post Information</h2>
            <button onClick={handleNavi} className="w-20 mb-3 bg-blue-500 text-white p-2 rounded">
                Back
            </button>
            <form onSubmit={handleSubmit}>
                <div className="w-80 h-12 my-3 rounded-md bg-[#F5F6FA] text-[#667281] p-1">
                    <input
                        type="text"
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-64 p-2 mb-3 bg-[#f5f6fa] rounded"
                        required
                    />
                </div>
                <div className="w-80 h-12 bg-[#F5F6FA] rounded-md text-[#667281] p-1">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 mb-3 bg-[#f5f6fa] rounded-md"
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                    </select>
                </div>

                <div className="w-80 h-12 bg-[#F5F6FA] my-3 rounded-md text-[#667281] p-1">
                    <input
                        type="text"
                        value={time} // O'qish rejimida vaqtni ko'rsatish
                        className="w-full p-2 mb-3"
                        disabled
                    />
                </div>

                <button type="submit" className="w-80 bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
