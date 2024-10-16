import { User as FirebaseUser } from "firebase/auth";
export type Auth = {
  email: string;
  password: string;
};
import { ReactNode } from "react";

export type LogOutFunction = () => void;

export type SignUpAndLoginFunction = {
  user: FirebaseUser | null;
  loading: boolean;
  loginWithEmailAndPassword: (user: Auth) => Promise<
    | User
    | {
        error: string;
        message: string;
      }
  >;
  logOut: LogOutFunction;
};

export type AuthProviderProps = {
  children: ReactNode;
};
