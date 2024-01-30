import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model <UserDocument>) {}

    async findUser(username: any): Promise <any> {
       const user = await this.userModel.findOne({username});
       if(!user) {
        return 'No user found. Would you like to create an account?'
       }
       return user
    }
    async registerUser(body: UsersDto): Promise <any> {
        try{
        const { username } = body //desestructuramos el body para sacar username
        const existingUser = await this.userModel.findOne({username})
        console.log(existingUser);
        if(!existingUser){
            await this.userModel.create(body)
            return {message: 'User has been registered', status: 201}
        }
        return {message: 'User already exists', status: 409}

        } catch(e){
            return {message: "Error while registration", status: 500}
        }
    }
}
