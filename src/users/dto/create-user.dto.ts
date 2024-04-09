import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsString({ message: 'Name is over than 50 characters long' })
  readonly username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @Transform(({ value }) => {
    console.log("role", value)
    return value === undefined ? UserRole.User : value
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either "admin" or "user"' })
  readonly role: UserRole;
}
