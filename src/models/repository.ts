export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
}
