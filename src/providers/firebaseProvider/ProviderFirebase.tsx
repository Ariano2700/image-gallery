"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Auth,
  AuthProviderProps,
  SignUpAndLoginFunction,
} from "../types/ContextType";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import { authInit as authFirebase } from "@/service/firebase/config";
import { FirebaseError } from "firebase/app";

export const contextAuth = createContext<SignUpAndLoginFunction | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(contextAuth);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

function ProviderFirebase({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] =
    useState<SignUpAndLoginFunction["loading"]>(false);

  const loginWithEmailAndPassword = async (user: Auth) => {
    const { email, password } = user;
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      const token = await result.user.getIdToken();
      document.cookie = `token=${token}; path=/;`;

      type userFirebaseType = Partial<User>;
      const userFirebase: userFirebaseType = {
        email: result.user.email,
      };

      const response = await fetch("/api/auth/signIn/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFirebase),
      });
      if (!response.ok) {
        throw new Error("error al intentar loguear con google");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorObj = {
          error: error.code,
          message: error.message,
        };
        throw errorObj;
      }
      console.error("Error durante el login con Google", error);
      throw error;
    }
  };

  const logOut = async () => {
    signOut(authFirebase);
    await fetch("/api/auth/logout/post", { method: "POST" });
    window.location.reload();
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(authFirebase, (CurrentUser) => {
      setUser(CurrentUser);
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  return (
    <contextAuth.Provider
      value={{
        loading,
        user,
        loginWithEmailAndPassword,
        logOut,
      }}
    >
      {children}
    </contextAuth.Provider>
  );
}

export default ProviderFirebase;
