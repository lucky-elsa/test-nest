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
/**
 * Handles requests to the /cats endpoint, providing CRUD operations
 * for cat entities and the ability to mark cats as favorites.
 * This controller requires JWT authentication for all routes.
 */
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * Creates a new cat profile. This endpoint is restricted to admin users.
   * 
   * @param createCatDto DTO containing the new cat's information.
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  /**
   * Retrieves a list of all cat profiles.
   */
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  /**
   * Retrieves a single cat profile by ID.
   * 
   * @param id The ID of the cat to retrieve.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  /**
   * Updates a cat profile. This endpoint is restricted to admin users.
   * 
   * @param id The ID of the cat to update.
   * @param updateCatDto DTO containing the updated cat's information.
   */
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  /**
   * Deletes a cat profile. This endpoint is restricted to admin users.
   * 
   * @param catId The ID of the cat to delete.
   */
  @Delete(':catId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  delete(@Param('catId', ParseIntPipe) catId: number) {
    return this.catsService.delete(catId);
  }

  /**
   * Marks a cat as a favorite for the current authenticated user.
   * 
   * @param catId The ID of the cat to mark as favorite.
   * @param req The request object to extract the user's ID.
   */
  @Post(':catId/favorite')
  addFavorite(@Param('catId', ParseIntPipe) catId: number, @Req() req: any) {
    return this.catsService.addFavorite(catId, req.user.userId);
  }
}

