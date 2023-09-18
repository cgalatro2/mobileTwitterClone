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
    email: string;
  };
};

const initialState: AuthState = {
  token: null,
  errorMessage: "",
  user: { username: "", email: "" },
};

type LoginArgs = {
  username?: string;
  email: string;
  password: string;
};
export async function login(
  dispatch,
  { username, email, password }: LoginArgs,
  signup = false
) {
  try {
    const response = await serverAPI.post(`/${signup ? "signup" : "login"}`, {
      username,
      email,
      password,
    });

    if (response?.data?.token && response?.data?.user) {
      const { token } = response.data;
      const user = JSON.parse(response.data.user);
      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("username", user.username);

      dispatch({
        type: "LOGIN",
        payload: { token, user },
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
  await SecureStore.deleteItemAsync("username");
  dispatch({ type: "LOGOUT" });
}

export async function tryLocalLogin(dispatch) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const username = await SecureStore.getItemAsync("username");
    if (token && username) {
      const response = await serverAPI.get(`/users/${username}`);
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
        user: { username, email },
      } = action.payload;
      return {
        errorMessage: "",
        token,
        user: {
          username: username,
          email: email,
        },
      };
    }
    case "LOGOUT": {
      return { ...initialState };
    }
    case "ERROR": {
      return { ...state, errorMessage: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}
