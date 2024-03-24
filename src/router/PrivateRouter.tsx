import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LOGIN } from "./paths";
import { AuthContext } from "@/providers/AuthProvider";
import { AppContextProvider } from "@/providers/AppContextProvider";
import Navigator from "@/components/Navigator";

export const PrivateRouter = () => {
  const { isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) navigate(LOGIN);
  }, [isAuthorized, navigate]);
  if (isAuthorized)
    return (
      <AppContextProvider>
        <div className="flex h-svh">
          <Navigator />
          <Outlet />
        </div>
      </AppContextProvider>
    );
};
