import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AnimalDocument = Animal & Document;

@Schema()

export class Animal  {
    @Prop()
    image: string
    @Prop()
    name: string
    @Prop({required: true})
    specie: string
    @Prop()
    sex: string
    @Prop({required: true})
    age: number
    @Prop()
    nature: string
    @Prop()
    available: boolean
   
}

export const AnimalSchema = SchemaFactory.createForClass(Animal)



