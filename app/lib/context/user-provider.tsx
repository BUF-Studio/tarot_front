"use client";

import React, { createContext, useState, useContext } from "react";
import { User } from "../definition";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserField: <K extends keyof User>(field: K, value: User[K]) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUserField = <K extends keyof User>(field: K, value: User[K]) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserField,
        clearUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
