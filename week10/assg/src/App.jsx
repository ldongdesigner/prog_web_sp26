import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import WonderDetail from "./WonderDetail";
import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":slug" element={<WonderDetail />} />
    </Routes>
  );
}