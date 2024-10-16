"use client";
import { useAuthContext } from "@/providers/firebaseProvider/ProviderFirebase";

const LogOutButton = () => {
  const { logOut } = useAuthContext();
  const handleLogout = () => {
    try {
      logOut();
    } catch (error: any) {
      console.log(error.message || "Error desconocido");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="w-40 rounded bg-danger-85 text-primary-5 p-2 text-center font-bold hover:bg-danger transition-all duration-300 ease-in"
    >
      Cerrar sesión
    </button>
  );
};

export default LogOutButton;
