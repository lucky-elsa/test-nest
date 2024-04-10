import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Cat } from './cats/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kym$972$3577',
      database: 'cat_adoption',
      entities: [User, Cat],
      synchronize: true
    }),
    CoreModule, 
    CatsModule, 
    AuthModule, 
    UsersModule
  ],
})
export class AppModule {}
