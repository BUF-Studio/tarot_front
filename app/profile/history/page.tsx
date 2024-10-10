import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import HistoryCard from "./components/history-card";
import Search from "@/app/components/search";

import { authenticatedUser } from "@/app/_utils/amplify-server-utils";
import { redirect } from "next/navigation";
import { Session } from "@/app/lib/definition";

export default async function History({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const user = await authenticatedUser();

  if (!user) {
    redirect("/signin");
  }

  const response = await fetch(
    `${process.env.PROTOCOL}://${process.env.BACKEND_URL}/userSessions?user_id=${encodeURIComponent(
      user.userId
    )}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    console.log("Response error:", response);
    return (
      <p className="body-large" style={{ textAlign: "center" }}>
        Failed to load
      </p>
    );
  }

  const data = await response.json();
  const filteredHistories = data.filter(
    (session: Session) =>
      session.summary.includes(query) || session.question.includes(query)
  );

  return (
    <Container maxWidth="sm">
      <Search placeholder={"Search histories"} />
      <Divider sx={{ my: 2 }} />
      {filteredHistories.length === 0 ? (
        <p className="body-large" style={{ textAlign: "center" }}>
          No history yet...
        </p>
      ) : (
        filteredHistories.map((session: Session) => (
          <HistoryCard key={session.session_id} session={session} />
        ))
      )}
    </Container>
  );
}
