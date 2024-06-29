import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../Home";
import Repository from "../Repository";

const App: React.FC = () => {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repository/:owner/:name" element={<Repository />} />
                </Routes>
            </Router>
    );
};

export default App;