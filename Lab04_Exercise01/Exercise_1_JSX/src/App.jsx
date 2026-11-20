import { Routes, Route } from "react-router";
import PeopleLayout from "./layouts/PeopleLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PeopleLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}