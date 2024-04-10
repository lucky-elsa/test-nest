import { IsEmail, IsString, MinLength, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsString()
  @MaxLength(50, { message: "Name must be less than 50 characters long" })
  readonly username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @Transform(({ value }) => value === undefined ? UserRole.User : value)
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either "admin" or "user"' })
  readonly role: UserRole;
}
