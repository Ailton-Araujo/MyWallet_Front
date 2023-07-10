import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SignOutOutlet() {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
}

function SignInOutlet() {
  const { auth } = useAuth();
  return auth ? <Navigate to="/home" /> : <Outlet />;
}

export { SignOutOutlet, SignInOutlet };
