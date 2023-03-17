import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.js";
import NavBar from "./components/navbar";
import MainPage from "./pages";
import MyQuestions from "./pages/my_questions";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/myquestions" element={<MyQuestions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
