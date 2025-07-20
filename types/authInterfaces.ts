export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  tnc: boolean;
}
