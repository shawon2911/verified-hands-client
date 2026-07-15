import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/Mainlayout";
import Home from "./pages/Home";
import Workers from "./pages/Workers";
import WorkerDetails from "./pages/WorkerDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProfile from "./pages/AddProfile";
import WorkerProfilePage from "./pages/WorkerProfile";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/workers/:id" element={<WorkerDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/add" element={<AddProfile />} />
        <Route path="/my-profile" element={<WorkerProfilePage />} />

      </Route>
    </Routes>
  );
}

export default App;
