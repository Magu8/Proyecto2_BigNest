import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UsersDto {

    @Transform(({value}) => value.trim()) //Esto impide que los espacios en blanco cuenten como caracteres
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({value}) => value.trim()) //Esto impide que los espacios en blanco cuenten como caracteres
    @IsString()
    @IsNotEmpty()
    @MinLength(6) //bastante obvio digo yo
    password: string;

}

