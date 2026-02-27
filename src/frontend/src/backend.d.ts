import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EventInfo {
    about: string;
    name: string;
    contactEmail: string;
    dates: string;
    location: string;
    contactPhone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEventInfo(): Promise<EventInfo>;
    getGoogleFormEmbedUrl(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setGoogleFormEmbedUrl(newUrl: string): Promise<void>;
    updateEventInfo(name: string, dates: string, location: string, about: string, contactEmail: string, contactPhone: string): Promise<void>;
}
