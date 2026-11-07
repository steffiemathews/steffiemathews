import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import LabBackground from "./components/LabBackground";
import TopBar from "./components/TopBar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Research from "./components/Research";
import Leadership from "./components/Leadership";
import Skills from "./components/Skills";
import { profile } from "./data";

export default function App() {
  // when the loading screen ends, body.play starts the staggered .rise reveal
  const onIntroDone = useCallback(() => {
    document.body.classList.remove("play");
    void document.body.offsetWidth; // restart the animation if it already ran
    document.body.classList.add("play");
  }, []);

  return (
    <div className="relative min-h-screen py-10">
      <LabBackground />
      <Intro onDone={onIntroDone} />
      <ScrollToTop />
      <TopBar />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <main className="mt-20 pb-16 md:pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </main>
        <footer className="text-center text-sm text-muted">
          © {new Date().getFullYear()} {profile.name} • {profile.location}
        </footer>
      </div>
    </div>
  );
}
