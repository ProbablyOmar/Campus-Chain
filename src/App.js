import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/header.js";
import NavBar from "./components/navbar";
import MainPage from "./pages";
import QuestionPage from "./pages/question_page";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import Register from "./pages/register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signin"
            element={
              !isLoggedIn ? (
                <Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <MainPage />
              )
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
