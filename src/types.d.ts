export interface User {
  name: string;
  login: string;
  email: string;
  company: string;
  location: string;
  bio: string;
  html_url: string;
  avatar_url?: string;
}

export interface UserMutation {
  name: string;
  company: string;
  location: string;
  bio: string;
}
