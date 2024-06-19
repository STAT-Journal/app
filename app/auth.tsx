import React from "react";
import { createContext } from "react";
import * as SecureStorage from "expo-secure-store";

const api_endpoint = "http://10.0.0.222:4000";

interface AuthContextType {
  user: UserType | undefined;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

interface UserType {
  email: string;
}

interface LoginResponseSuccessType {
  token: string;
  user: UserType;
}

interface LoginResponseErrorType {
  error: string;
}

interface AuthProviderState {
  user: UserType;
  apiToken: string;
}

function fetchApiTokenFromApi(email: string, password: string) {
  let payload = {
    user: {
      email: email,
      password: password,
    },
  };
  return fetch(`${api_endpoint}/api/users/log_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

function fetchAuthFromSecureStorage() {
  return SecureStorage.getItemAsync("auth")
    .then((json) => {
      if (json) {
        return JSON.parse(json);
      }
    })
    .then((auth: AuthProviderState) => {
      if (auth) {
        return auth;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  logIn: (_email: string, _password: string) => console.warn("no AuthProvider"),
  logOut: () => console.warn("no AuthProvider"),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = React.useState<
    AuthProviderState | undefined
  >(undefined);

  React.useEffect(() => {
    fetchAuthFromSecureStorage().then((auth) => {
      if (auth) {
        setAuthState(auth);
      }
    });
  }, []);

  function logIn(email: string, password: string) {
    return fetchApiTokenFromApi(email, password)
      .then((response: LoginResponseSuccessType | LoginResponseErrorType) => {
        if ("error" in response) {
          throw new Error(response.error);
        } else {
          const auth = { user: response.user, apiToken: response.token };
          SecureStorage.setItemAsync("auth", JSON.stringify(auth)).then(() => {
            setAuthState(auth);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logOut() {
    setAuthState(undefined);
  }

  return (
    <AuthContext.Provider value={{ user: authState?.user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
