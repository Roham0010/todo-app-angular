export interface LoginForm {
	email: string;
	password: string;
}

export type RegisterForm = LoginForm & {
	name: string;
	password_confirmation: string;
};

export interface AuthResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
};