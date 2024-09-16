export enum Gender {
  Male = "Male",
  Female = "Female",
  PreferNotToSay = "Prefer not to say",
}

export enum Model {
  GPT4O = "gpt-4o",
  GPT4OMini = "gpt-4o-mini",
  Llama31 = "llama3.1",
}

export enum SubscriptionType {
  Free = "free",
  Premium = "premium",
}

export type User = {
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
  usage: number;
};

export type Session = {
  cards: { position: string; description: string }[];
  session_id: string;
  question: string;
  session_created: string;
  stage: string;
  summary: string;
};
