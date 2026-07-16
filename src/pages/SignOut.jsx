import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage/session if needed
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to dashboard or login page
    navigate("/");
  }, [navigate]);

  return null;
}