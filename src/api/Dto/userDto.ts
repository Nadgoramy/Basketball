export interface UserDto {
  name: string;
  avatarUrl: string;
  token: string;
}

export interface LoginFormDto {
  login: string;
  password: string;
}

export interface RegisterFormDto {
  userName: string;
  login: string;
  password: string;
}
