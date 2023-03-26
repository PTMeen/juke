import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User,
  signOut,
  UserInfo,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthContextType {
  googleSignin: () => void;
  logout: () => void;
  user: User | null | undefined;
}

const AuthContext = createContext<AuthContextType>({
  googleSignin: () => {},
  user: undefined,
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const googleSignin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  });

  const value = { googleSignin, user, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
