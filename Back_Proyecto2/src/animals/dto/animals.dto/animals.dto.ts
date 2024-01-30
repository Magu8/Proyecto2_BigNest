import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';


export class AnimalsDto {

    @IsString()
    image: string;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    specie: string;

    @IsString()
    @IsNotEmpty()
    sex: string;

    @IsInt({message: 'This field must be filled with a number'}) 
    @IsNotEmpty()
    age: number;

    @IsString()
    nature: string;

    @IsBoolean()
    available: boolean;



}
