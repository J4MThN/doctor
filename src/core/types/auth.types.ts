import { Role } from "../constants";
 

export interface AuthUser {
  id: number;
  mobile: string;
  role: Role;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  birthDate: string;
  role: string;
  profileImagePath: string | null;
 
  status: string;
  createDate: string;
}

export interface AuthState {
  accessToken: string | null;

  user: AuthUser | null;

  profile: UserProfile | null;

  isInitialized: boolean;

  setAuth: (accessToken: string) => void;

  setAccessToken: (accessToken: string | null) => void;

  setProfile: (profile: UserProfile | null) => void;

  setInitialized: (value: boolean) => void;

  clearAuth: () => void;
}