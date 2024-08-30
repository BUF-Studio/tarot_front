"use client";

import React, { createContext, useState, useContext } from "react";

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  PreferNotToSay = 'Prefer not to say'
}

export enum Model {
  GPT4O = 'gpt4o',
  GPT4OMini = 'gpt4o-mini',
  Llama31 = 'llama3.1'
}

export enum SubscriptionType {
  Free = 'free',
  Premium = 'premium'
}

interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  age?: number;
  gender?: Gender;
  model: Model;
  subscription_type: SubscriptionType;
  subscription_start?: Date;
  subscription_end?: Date;
  usage: number
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserField: <K extends keyof User>(field: K, value: User[K]) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserContextProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
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