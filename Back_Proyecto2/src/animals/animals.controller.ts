import {
  Controller,
  Put,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  NotFoundException,
  InternalServerErrorException,
  UseFilters,
  NotAcceptableException,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ok } from 'assert';
import { error } from 'console';

@Controller('bigNest')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('availableAnimals')
  async getAvailableAnimals(): Promise<any> {
      let animals = await this.animalService.findAvailableAnimals();
      return animals;
  }

  @UseGuards(JwtAuthGuard)
  @Get('adoptedAnimals')
  async getAdoptedAnimals(): Promise<any> {
      let animals = await this.animalService.findAdoptedAnimals();
      return animals;
  }

  // @UseGuards(JwtAuthGuard) //must check
  @Put('adoptAnimal/:id')
  // @HttpCode(HttpStatus.OK)
  async adoptAnimal(@Param('id') _id: string): Promise<any> {
    try {
    const updatedAnimal = await this.animalService.adoptAnimal(_id)
    return {updatedAnimal}
    } catch(e) {
      throw new NotFoundException("Error while adopting animal")
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('putIntoAdoption')
  async putIntoAdoption(@Body() body: any): Promise<any> {
    console.log(body);
    try {
      const adoptableAnimal = await this.animalService.putIntoAdoption(body);
      return adoptableAnimal;
    } catch (e) {
      throw new NotAcceptableException ("Error while putting into adoption");
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('deleteAnimal/:name')
  async eraseAnimal(@Param('name') name: string): Promise<any> {
    try {
      const deletedAnimal = await this.animalService.deleteAnimal(name);
      return deletedAnimal;
    } catch (e) {
      throw new NotFoundException ('An error occurred while deleting the animal');
    }
  }
}
