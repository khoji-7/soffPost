import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePafe"; // to'g'ri nom bilan almashtirildi
import AddPost from "./page/AddPost";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <section className=" flex flex-col">
            <Navbar />
            <div className="grid grid-cols-[1fr_5fr] gap-5 justify-center">
                <Sidebar />
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<AddPost />} />
                    </Routes>
                </Router>
            </div>
        </section>
    );
};

export default App;
