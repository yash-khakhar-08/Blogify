export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    user: IUser | null;
}
