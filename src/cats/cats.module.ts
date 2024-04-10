import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './cat.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    AuthModule,
    UsersModule
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
