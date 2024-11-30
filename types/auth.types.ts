// types/auth.types.ts
export enum LoginActionTypes {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_ERROR = "SET_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
  TOGGLE_PASSWORD = "TOGGLE_PASSWORD",
}

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    email?: string;
    password?: string;
  };
}

export type ErrorField = "email" | "password";

export interface LoginAction {
  type: LoginActionTypes;
  payload?: string | { [key in ErrorField]?: string };
}
