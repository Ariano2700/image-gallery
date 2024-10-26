"use client";
import { MdiLogout } from "@/features/ui";
import { useAuthContext } from "@/providers/firebaseProvider/ProviderFirebase";

const LogOutButton = () => {
  const { logOut, user } = useAuthContext();
  const handleLogout = () => {
    try {
      logOut();
    } catch (error: any) {
      console.log(error.message || "Error desconocido");
    }
  };
  return (
    <>
      {user !== null && (
        <button
          onClick={handleLogout}
          className=" w-full rounded-lg p-3 bg-danger-85 text-primary-5 text-center font-bold hover:bg-danger transition-all duration-300 ease-in flex items-center justify-center gap-4"
        >
          Cerrar sesión <MdiLogout />
        </button>
      )}
    </>
  );
};

export default LogOutButton;
