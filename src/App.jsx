import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ParticlesBg from "./components/ParticlesBg";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Education from "./pages/Education";
import Alternance from "./pages/Alternance";
import Recommendations from "./pages/Recommendations";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <Router>
      <div className={`app ${loaded ? "loaded" : ""}`}>
        <CustomCursor />
        <ParticlesBg />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/experiences/:id" element={<ExperienceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/education" element={<Education />} />
            <Route path="/alternance" element={<Alternance />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}