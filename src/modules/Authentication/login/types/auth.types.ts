
export interface LoginRequest {
  mobile: string;
  pin: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpireAt: string;
}