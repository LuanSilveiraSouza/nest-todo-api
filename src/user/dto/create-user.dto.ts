import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsEnum(UserRoles)
  @IsNotEmpty()
  readonly role: UserRoles;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
