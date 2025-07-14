import {UUID} from "../types/authTypes.ts";
import {RoleName} from "./RoleName.ts";

export interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    accessToken: string | null;
    loading: boolean;
    role: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean }>;
    logout: () => void;
}

export interface AuthResponse {
    email: string;
    password: string;
    userId: UUID;
    roleName: string;
    accessToken: string;
    refreshToken: string;
}