"use client";
import { useState } from "react";
import Input from "../components/Input";
import { Loader, SolarLockOutline, SolarUserOutline } from "@/features/ui";
import { Auth } from "@/providers/types/ContextType";
import {
  ErrorType,
  handleChangeType,
  handleSubmitType,
} from "../types/formType";
import { useAuthContext } from "@/providers/firebaseProvider/ProviderFirebase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { loginWithEmailAndPassword, loading } = useAuthContext();
  const [userForm, setUserForm] = useState<Auth>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorType>("");
  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      const response = await loginWithEmailAndPassword(userForm);
      if (!response) {
        setError(response);
      }
      router.push("/panel");
    } catch (error) {
      console.error("Error durante la autenticación:", error);
    }
  };
  return (
    <section className="min-h-full flex justify-center items-center flex-col">
      {loading === true ? (
        <Loader />
      ) : (
        <div className="w-64 h-full rounded-md p-5 bg-primary-5 text-primary-30 flex flex-col">
          <div className="mb-3 flex relative justify-center">
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>
            <img
              className="absolute -right-10 -top-10"
              src="/assets/hello lazo.png"
              width={80}
              height={60}
              alt="hello kitty lazo"
            />
          </div>
          <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
            {error && (
              <div className="w-full rounded-md bg-red-500 text-white font-bold p-3">
                {error}
              </div>
            )}
            <Input
              key={1}
              onChange={handleChange}
              name="email"
              type="email"
              icon={<SolarUserOutline className="text-xl" />}
              placeholder="Correo electronico"
              styleProp="w-full p-3 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-pink-500 rounded-md"
            />
            <Input
              key={2}
              onChange={handleChange}
              name="password"
              type="password"
              icon={<SolarLockOutline className="text-xl" />}
              placeholder="Contraseña"
              styleProp="w-full p-3 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-pink-500 rounded-md"
            />
            <button className="w-full rounded bg-primary-30 text-primary-5 p-2 text-center font-bold hover:bg-pink-600 transition-all duration-300 ease-in">
              Ingresar
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
export default LoginPage;
