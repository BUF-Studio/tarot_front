"use client";

import { Session } from "@/app/history/session-interface";
import React, { createContext, useState } from "react";

interface HistoryContextType {
  histories: Session[];
  currentHistories: Session;
  updateHistories: (histories: Session[]) => void;
  updateCurrentHistories: (history: Session) => void;
}

const HistoryContext = createContext<HistoryContextType>(
  {} as HistoryContextType
);

const HistoryContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const [histories, setHistories] = useState<Session[]>([]);
  const [currentHistories, setCurrentHistories] = useState<Session>(
    {} as Session
  );

  const updateHistories = (histories: Session[]) => {
    setHistories(histories);
  };

  const updateCurrentHistories = (history: Session) => {
    setCurrentHistories(history);
  };

  return (
    <HistoryContext.Provider
      value={{
        histories,
        currentHistories,
        updateHistories,
        updateCurrentHistories,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryContextProvider };
