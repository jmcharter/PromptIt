import { UserData } from "./DataModels";

export interface ValidateResponse {
    userdata: UserData;
}

export interface LoginResponse {
    userdata: UserData;
    token: string;
    message?: string;
}