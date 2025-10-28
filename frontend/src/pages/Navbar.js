import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import DataList from "../pages/DataList";
import Perspective from "./Perspective";

export default function Navbar() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/perspective" element={<Perspective />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
