import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { ItemFormPage } from "./pages/ItemFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/ItemPage";
import { TaskProvider } from "./context/itemsContext";
import { useAuth } from "./context/authContext";
  
function AppContent() {
  const { user } = useAuth();

  return (
    <TaskProvider token={user?.token}>
      <BrowserRouter>
        <main className="container py-4 content-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<ItemFormPage />} />
              <Route path="/tasks/:id" element={<ItemFormPage />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </TaskProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


