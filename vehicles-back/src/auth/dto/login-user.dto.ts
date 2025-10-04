import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        example: 'test@test.com / username',
        description: 'Nombre de usuario o correo',
        nullable: false,
      })
      @IsString()
      user: string;
    
      @ApiProperty({
        example: '123456',
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
