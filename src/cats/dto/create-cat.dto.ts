import { IsString, IsInt, IsBoolean, IsOptional, IsDate, IsEnum, MaxLength } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MaxLength(50, { message: 'Name is over than 50 characters long' })
  name: string;

  @IsString()
  @MaxLength(50, {message: 'Breed Description must be less than 50 characters long'})
  @IsOptional()
  breed: string = 'unknown';

}
