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

export interface Repository {
  id: number;
  private: boolean;
  name: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  };
}

export interface AnotherUser {
  id: number;
  login: string;
  repos_url: string;
}

export interface AnotherUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: AnotherUser[];
}
