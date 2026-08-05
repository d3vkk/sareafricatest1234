import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/forms/LoginForm";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
