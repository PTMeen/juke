import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function PrivateRoute({ children }: { children: React.ReactNode }): any {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
export default PrivateRoute;
