export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignInSuccessModel {
  accessToken: string;
  expiresIn: number;
}
