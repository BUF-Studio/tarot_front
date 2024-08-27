"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface UnregisteredUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  age?: number;
  gender?: string;
}

interface AuthContextType {
  unregisteredUser: UnregisteredUser;
  setUnregisteredUser: (user: Partial<UnregisteredUser>) => void;
  clearUnregisteredUser: () => void;
}

const initialUnregisteredUser: UnregisteredUser = {
  id: "",
  email: "",
  name: "",
  phone: "",
  age: 0,
  gender: "",
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [unregisteredUser, setUnregisteredUser] = useState<UnregisteredUser>(initialUnregisteredUser);

  useEffect(() => {
    // Load unregistered user data from localStorage when the component mounts
    const storedUser = localStorage.getItem('unregisteredUser');
    if (storedUser) {
      setUnregisteredUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUnregisteredUser = (user: Partial<UnregisteredUser>) => {
    setUnregisteredUser(prevUser => {
      const newUser = { ...prevUser, ...user };
      // Save to localStorage
      localStorage.setItem('unregisteredUser', JSON.stringify(newUser));
      return newUser;
    });
  };

  const clearUnregisteredUser = () => {
    setUnregisteredUser(initialUnregisteredUser);
    localStorage.removeItem('unregisteredUser');
  };

  return (
    <AuthContext.Provider
      value={{
        unregisteredUser,
        setUnregisteredUser: updateUnregisteredUser,
        clearUnregisteredUser,
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