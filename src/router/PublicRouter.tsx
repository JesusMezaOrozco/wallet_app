import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { HOME } from "./paths";
import { Navigate, Outlet } from "react-router";

export const PublicRouter = () => {
  const { isAuthorized } = useContext(AuthContext);
  if (isAuthorized) {
    return <Navigate to={HOME} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
