import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/Homepage';
import PostProblem from './pages/PostProblem';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />  {/* ✅ Correct — only ONE navbar here */}
      <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post" element={<h1>Post Problem</h1>} />
                <Route path="/post-problem" element={<PostProblem />} />

        import HomePage from "./pages/HomePage";

<Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
