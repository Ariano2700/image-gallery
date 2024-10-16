import { ChangeEvent, FormEvent } from "react";

export type ErrorType = string | null;

export type InputLoginRegisterProps = {
  placeholder?: string;
  type: "text" | "email" | "password" | "number";
  name: string;
  value?: string;
  icon?: JSX.Element;
  styleProp?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
export type handleChangeType = (e: ChangeEvent<HTMLInputElement>) => void;
export type handleSubmitType = (e: FormEvent<HTMLFormElement>) => void;
export type handleDeleteType = () => void;
