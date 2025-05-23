import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @MinLength(8)
  password: string;
}
