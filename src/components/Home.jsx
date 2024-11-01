import React, {useEffect, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState(""); // Qidiruv so'zini saqlash

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(savedPosts);
    }, []);

    const handleDelete = (id) => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    const filteredPosts = posts.filter((post) => {
        const matchesStatus = selectedStatus === "All" || post.status.toLowerCase() === selectedStatus.toLowerCase();
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()); // Qidiruv
        return matchesStatus && matchesSearch; // Status va qidiruvga mos kelishi
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCreatePost = () => {
        navigate("/create");
    };

    return (
        <main className="max-w-5xl h-[640px]">
            <div className="flex justify-between">
                <div className="h-9 max-w-md bg-[#f5f6fa] items-center rounded-md p-3 justify-center flex gap-2">
                    <p className="text-[#667281] text-[13px] font-normal leading-3">Search</p>
                    <input
                        type="text"
                        className="bg-[#f5f6fa] w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <CiSearch />
                </div>
                <button
                    onClick={handleCreatePost}
                    type="button"
                    className="w-40 h-9 bg-[#177EFF] text-white rounded-lg"
                >
                    Create Post
                </button>
            </div>

            <div className="mt-6 flex max-w-lg gap-2 mb-6">
                <button
                    onClick={() => setSelectedStatus("All")}
                    className={`w-36 h-9 rounded-md flex p-2 justify-between items-center ${
                        selectedStatus === "All"
                            ? "bg-[#177EFF] text-white"
                            : "bg-[#F5F6FA] hover:bg-[#177EFF] hover:text-white"
                    }`}
                >
                    All Status
                    <span className="h-5 flex items-center justify-center text-white rounded-xl w-6 bg-[#B2C2DF]">
                        {posts.length}
                    </span>
                </button>
                <button
                    onClick={() => setSelectedStatus("Draft")}
                    className={`w-36 h-9 rounded-md flex p-2 justify-between items-center ${
                        selectedStatus === "Draft"
                            ? "bg-[#177EFF] text-white"
                            : "bg-[#F5F6FA] hover:bg-[#177EFF] hover:text-white"
                    }`}
                >
                    Draft
                    <span className="h-5 flex items-center justify-center text-white rounded-xl w-6 bg-[#B2C2DF]">
                        {posts.filter((post) => post.status === "Draft").length}
                    </span>
                </button>
                <button
                    onClick={() => setSelectedStatus("Published")}
                    className={`w-36 h-9 rounded-md flex p-2 justify-between items-center ${
                        selectedStatus === "Published"
                            ? "bg-[#177EFF] text-white"
                            : "bg-[#F5F6FA] hover:bg-[#177EFF] hover:text-white"
                    }`}
                >
                    Published
                    <span className="h-5 flex items-center text-white justify-center rounded-xl w-6 bg-[#B2C2DF]">
                        {posts.filter((post) => post.status === "Published").length}
                    </span>
                </button>
            </div>

            {/* Pagination uchun tanlash menyusi */}
            <div className="flex justify-end mb-4">
                <label htmlFor="postsPerPage" className="mr-2">
                    Posts per page:
                </label>
                <select
                    id="postsPerPage"
                    value={postsPerPage}
                    onChange={(e) => {
                        setPostsPerPage(Number(e.target.value));
                        setCurrentPage(1); 
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentPosts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {post.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <select
                                        value={post.status}
                                        onChange={(e) => {
                                            const updatedPosts = posts.map((p) =>
                                                p.id === post.id ? {...p, status: e.target.value} : p
                                            );
                                            setPosts(updatedPosts);
                                            localStorage.setItem("posts", JSON.stringify(updatedPosts));
                                        }}
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </main>
    );
};

export default Home;
