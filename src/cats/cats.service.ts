import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { User } from '../users/user.entity';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catsRepository.create(createCatDto);
    return await this.catsRepository.save(cat)
  }
  
  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) throw new NotFoundException(`Cat with ID ${id} not found`);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.findOne(id);
    const updated = Object.assign(cat, updateCatDto);
    return this.catsRepository.save(updated);
  }

  async delete(catId: number): Promise<void> {
    const result = await this.catsRepository.delete(catId);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID ${catId} not found`);
    }
  }

  async addFavorite(catId: number, userId: number): Promise<void> {
    console.log({ catId, userId })
    const cat = await this.findOne(catId);
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    user.favorites = [...user.favorites, cat];
    await this.usersRepository.save(user);
  }
}
