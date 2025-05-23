import { FastifyRequest } from 'fastify';

export interface JwtPayload {
  sub: string;
  login: string;
  role?: string;
}

export interface RequestWithUser extends FastifyRequest {
  user: JwtPayload;
}
