import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../user.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsEnum(UserRoles)
  @IsNotEmpty()
  readonly role: UserRoles;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
