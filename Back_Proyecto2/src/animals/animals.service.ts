import { Injectable } from '@nestjs/common';
import {
  Animal,
  AnimalDocument
} from './animals.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalsDto } from './dto/animals.dto/animals.dto';
// import { Express } from 'express';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}

  async findAvailableAnimals() {
    return this.animalModel.find({ available: true }).exec();
  }

  async findAdoptedAnimals() {
    return this.animalModel.find({ available: false }).exec();
  }


  async adoptAnimal(_id: string): Promise <any> {
    let animal = await this.animalModel.findById(_id);
    console.log(animal)
    return await this.animalModel.findByIdAndUpdate(_id, {$set:{available: !animal.available}})
  }

  async putIntoAdoption(body: AnimalsDto): Promise<any> {
    // body.available = true //si queremos añadirle un elemento nuevo al body que recibimos, tenemos que establecerlo antes   
    await this.animalModel.create(body); //y luego crearlo
    return 'Animal successfully put into adoption!'

  }
  async deleteAnimal(name: string): Promise <any> {
    await this.animalModel.findOneAndDelete({name})
    return 'Succesfully deleted'
}
}
