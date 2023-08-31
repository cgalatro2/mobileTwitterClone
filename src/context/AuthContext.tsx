import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

type AuthState = {
  isLoggedIn: boolean;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false });

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
      return { ...state, isLoggedIn: true };
    }
    case "LOGOUT": {
      return { ...state, isLoggedIn: false };
    }
    default: {
      return { ...state };
    }
  }
}
