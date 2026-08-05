import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
