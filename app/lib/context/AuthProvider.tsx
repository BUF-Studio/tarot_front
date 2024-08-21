"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UnregisteredUser {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  unregisteredUser: UnregisteredUser;
  setUnregisteredUser: (user: UnregisteredUser) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [unregisteredUser, setUnregisteredUser] = useState<UnregisteredUser>({
    id: "",
    email: "",
    name: "",
    phone: "",
  });

  return (
    <AuthContext.Provider
      value={{
        unregisteredUser,
        setUnregisteredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};