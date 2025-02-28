import { BrowserRouter, Routes, Route } from "react-router-dom";
import New from "../pages/New/index.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Supllier from "../pages/Supplier/index.jsx"
import Profle from "../pages/Profile/index.jsx"
import Login from "../pages/Auth/login.jsx";
import Register from "../pages/Auth/register.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/consultas" element={<Supllier />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new" element={<New />} />
                <Route path="/new/:id" element={<New />} />
                <Route path="/perfil" element={<Profle />} />
            </Routes>
        </BrowserRouter>
    );
}