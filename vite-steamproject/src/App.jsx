import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfilesListPage } from "./pages/ProfilesListPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterPage } from "./pages/RegisterPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserBibliotecaPage } from "./pages/UserBibliotecaPage";


function App(params) {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profiles" element={<ProtectedRoute><ProfilesListPage /></ProtectedRoute>} />
    <Route path="/profile" element={<Navigate to="/login" />} />
    <Route path="/profile/:id"element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/profile/edit/:id" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
    <Route path="/biblioteca" element={<ProtectedRoute><UserBibliotecaPage /></ProtectedRoute>} />
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable theme="dark"/>
    </BrowserRouter>
  )
}

export default App
