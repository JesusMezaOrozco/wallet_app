import { AuthContext } from "@/providers/AuthProvider";
import { HOME, TRANSFER } from "@/router/paths";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const pages = [
  { name: "Inicio", route: HOME },
  { name: "Transferir", route: TRANSFER },
];

export default function Navigator() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <img
        src="/images/illustrations.svg"
        alt="illustration"
        className="absolute bottom-0"
      />
      <div className="min-w-[372px] bg-blue-1 h-full p-16 flex flex-col justify-between">
        <ul className="gap-6 flex flex-col absolute left-0">
          {pages.map((page, idx) => {
            return (
              <NavLink
                key={idx}
                to={page.route}
                className={({ isActive }) =>
                  (isActive ? "bg-blue-2" : "") +
                  " text-white w-[180px] h-[50px] flex items-center pl-16 rounded-r-[35px]"
                }
              >
                <p>{page.name}</p>
              </NavLink>
            );
          })}
        </ul>
        <button
          onClick={logout}
          className="z-10 h-10 text-white absolute bottom-16"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
