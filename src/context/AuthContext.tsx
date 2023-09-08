import { createContext, useContext, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

import serverAPI from "api/serverAPI";

// TODO: type these https://kentcdodds.com/blog/how-to-use-react-context-effectively
const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

type AuthState = {
  token: string;
  errorMessage: string;
};

export async function login(dispatch, { email, password }) {
  try {
    const response = await serverAPI.post("/login", { email, password });
    await SecureStore.setItemAsync("token", response?.data?.token ?? "");
    dispatch({ type: "LOGIN", payload: response.data.token });
  } catch (err) {
    dispatch({
      type: "ERROR",
      payload: `Something went wrong with login: ${err.message}`,
    });
  }
}

export async function signup(dispatch, { email, password }) {
  try {
    const response = await serverAPI.post("/signup", { email, password });
    await SecureStore.setItemAsync("token", response?.data?.token ?? "");
    dispatch({ type: "SIGNUP", payload: response.data.token });
  } catch (err) {
    dispatch({
      type: "ERROR",
      payload: `Something went wrong with signup: ${err.message}`,
    });
  }
}

export async function logout(dispatch) {
  await SecureStore.deleteItemAsync("token");
  dispatch({ type: "LOGOUT" });
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    token: SecureStore.getItemAsync("token" ?? ""),
    errorMessage: "",
  });

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

function authReducer(state: AuthState, action: any) {
  switch (action.type) {
    case "LOGIN": {
      return { errorMessage: "", token: action.payload };
    }
    case "SIGNUP": {
      return { errorMessage: "", token: action.payload };
    }
    case "LOGOUT": {
      return { ...state, token: "" };
    }
    case "ERROR": {
      return { ...state, errorMessage: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}
