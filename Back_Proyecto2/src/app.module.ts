import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsController } from './animals/animals.controller';
import { AnimalsModule } from './animals/animals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';

import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/bigNest'),
    AnimalsModule,
    UsersModule,
    MulterModule.register({
      dest:'./bigNest'
    }),
    AuthModule,
  ],
  controllers: [AppController, AnimalsController, UsersController],
  providers: [AppService]
})
export class AppModule {}
