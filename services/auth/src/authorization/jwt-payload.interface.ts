export interface JwtPayload {
  sub: string;
  login: string;
  role?: string;
}
