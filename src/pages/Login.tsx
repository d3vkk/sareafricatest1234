import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import {LoginForm} from "@/components/forms/LoginForm";
import Sidebar from "@/components/Sidebar";

export default function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Sidebar />
      <LoginForm />
    </>
  );
}
