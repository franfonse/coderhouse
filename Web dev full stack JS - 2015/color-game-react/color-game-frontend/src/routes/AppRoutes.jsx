import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/auth/auth";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Game from "../pages/Game/Game";
import Scores from "../pages/Scores/Scores";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public, but redirect if logged in */}
      <Route path="/" element={<Home/>}/>

      <Route
        path="/signup"
        element={user ? <Navigate to="/game" replace /> : <SignUp />}
      />

      {/* Protected */}
      <Route
        path="/game"
        element={user ? <Game /> : <Navigate to="/" replace />}
      />
      <Route
        path="/scores"
        element={user ? <Scores /> : <Navigate to="/" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
