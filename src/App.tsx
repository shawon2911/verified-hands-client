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
import PostJob from "./pages/PostJob";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequest";
import JobDetails from "./pages/JobDetails";
import WorkerDashboard from "./pages/WorkerDashboard";
import Categories from "./pages/Categories";

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
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/dashboard/manage" element={<Dashboard />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/worker/jobs" element={<WorkerDashboard />} />
        <Route path="/categories" element={<Categories />} />

      </Route>
    </Routes>
  );
}

export default App;
