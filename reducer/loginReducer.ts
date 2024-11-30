// reducers/loginReducer.ts
export enum LoginActionTypes {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_ERROR = "SET_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
  TOGGLE_PASSWORD = "TOGGLE_PASSWORD",
}

interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    email?: string;
    password?: string;
  };
}

type ErrorField = "email" | "password";

interface LoginAction {
  type: LoginActionTypes;
  payload?: string | { [key in ErrorField]?: string };
}

export const initialState: LoginState = {
  email: "",
  password: "",
  showPassword: false,
  errors: {},
};

export function loginReducer(
  state: LoginState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case LoginActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      };
    case LoginActionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload as string,
      };
    case LoginActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...(action.payload as { [key in ErrorField]?: string }),
        },
      };
    case LoginActionTypes.CLEAR_ERROR:
      const { [action.payload as ErrorField]: _, ...remainingErrors } =
        state.errors;
      return {
        ...state,
        errors: remainingErrors,
      };
    case LoginActionTypes.TOGGLE_PASSWORD:
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    default:
      return state;
  }
}
