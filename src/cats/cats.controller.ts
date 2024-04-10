import { Body, Controller, Get, Param, Post, Put, UseGuards, ParseIntPipe, Req, Delete } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../users/user-role.enum';
import { UpdateCatDto } from './dto/update-cat.dto';

@UseGuards(JwtAuthGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':catId')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Admin)
  delete(@Param('catId', ParseIntPipe) catId: number) {
    return this.catsService.delete(catId);
  }


  @Post(':catId/favorite')
  addFavorite(@Param('catId', ParseIntPipe) catId: number, @Req() req: any) {
    return this.catsService.addFavorite(catId, req.user.userId);
  }
}
