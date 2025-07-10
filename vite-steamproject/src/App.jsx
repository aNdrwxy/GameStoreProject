import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfilesListPage } from "./pages/ProfilesListPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { Header } from "./components/Header";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterPage } from "./pages/RegisterPage";

function App(params) {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profiles" element={<ProtectedRoute><ProfilesListPage /></ProtectedRoute>} />
    <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/profile/:id/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
