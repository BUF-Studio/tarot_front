export interface Session {
    id: string;
    question: string;
    stage: string;
    cards: { position: string; description: string }[];
    summary: string;
    current_card: number;
    session_created: Date;
  }
  