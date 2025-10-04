import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'Sebas Cifu',
        description: 'Nombre del usuario',
        nullable: false,
      })
      @IsString()
      @MinLength(1)
      name: string;
    
      @ApiProperty({
        example: 'sebas123',
        description: 'Nombre de usuario',
        nullable: false,
      })
      @IsString()
      @MinLength(1)
      username: string;
    
      @ApiProperty({
        example: 'sebas@cifu.com',
        description: 'Correo',
        nullable: false,
      })
      @IsEmail()
      email: string;
    
      @ApiProperty({
        example: 'password',
        description: 'Password',
        nullable: false,
      })
      @IsString()
      @MinLength(6)
      @MaxLength(50)
      @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          'The password must have a Uppercase, lowercase letter and a number',
      })
      password: string;

}
