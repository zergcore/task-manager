interface LoginResponse {
  token: string;
}
interface RegisterResponse {
  message: string
}
interface LoginData {
  email: string;
  password: string;
}
interface RegisterData extends LoginData{}

export type { LoginResponse, LoginData, RegisterData, RegisterResponse };
