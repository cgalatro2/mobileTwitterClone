import { createContext, useContext, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

import serverAPI from "api/serverAPI";

// TODO: type these https://kentcdodds.com/blog/how-to-use-react-context-effectively
const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

type AuthState = {
  token: string | null;
  errorMessage: string;
  user: {
    username: string;
    userId: string;
    email: string;
  };
};

const initialState: AuthState = {
  token: null,
  errorMessage: "",
  user: { username: "", userId: "", email: "" },
};

export async function login(dispatch, { email, password }, signup = false) {
  try {
    const response = await serverAPI.post(`/${signup ? "signup" : "login"}`, {
      email,
      password,
    });
    if (response?.data?.token && response?.data?.user) {
      await SecureStore.setItemAsync("token", response.data.token);
      const user = JSON.parse(response.data.user);
      await SecureStore.setItemAsync("userId", user._id);
      dispatch({
        type: "LOGIN",
        payload: { token: response.data.token, user },
      });
    } else {
      console.log(
        `Something went wrong with ${signup ? "signup" : "login"}: `,
        response.data
      );
    }
  } catch (err) {
    dispatch({
      type: "ERROR",
      payload: `Something went wrong with ${signup ? "signup" : "login"}: ${
        err.message
      }`,
    });
  }
}

export async function logout(dispatch) {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("userId");
  dispatch({ type: "LOGOUT" });
}

export async function tryLocalLogin(dispatch) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const userId = await SecureStore.getItemAsync("userId");
    if (token && userId) {
      const response = await serverAPI.get("/users", { params: { userId } });
      if (response.data) {
        const user = JSON.parse(response.data.user);
        dispatch({ type: "LOGIN", payload: { token, user } });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  } catch (err) {
    console.log(`Something went wrong with local login: ${err.message}`);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
      const {
        token,
        user: { username, email, _id },
      } = action.payload;
      return {
        errorMessage: "",
        token,
        user: {
          username: username,
          email: email,
          userId: _id,
        },
      };
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
