export interface Session {
  cards: { position: string; description: string }[];
  session_id: string;
  question: string;
  session_created: string;
  stage: string;
  summary: string;
}
