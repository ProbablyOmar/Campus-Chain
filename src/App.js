import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.js";
import NavBar from "./components/navbar";
import MainPage from "./pages";
import MyQuestions from "./pages/my_questions";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/myquestions" element={<MyQuestions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
