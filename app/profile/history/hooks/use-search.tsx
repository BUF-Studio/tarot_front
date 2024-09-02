import { useState, useMemo } from "react";
import { Session } from "@/app/lib/definition";

function useSearch(histories: Session[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistories = useMemo(() => {
    if (!searchQuery) return histories;
    return histories.filter(
      (session) =>
        session.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, histories]);

  return { searchQuery, setSearchQuery, filteredHistories };
}

export default useSearch;
