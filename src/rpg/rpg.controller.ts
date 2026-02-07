import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { RpgService } from './rpg.service';

@Controller('rpg')
export class RpgController {
  constructor(private readonly rpgService: RpgService) {}

  @Get()
  getAllRpgs(@Query() paginationQuery?: QueryPaginationDto) {
    return this.rpgService.getAllRpgs(paginationQuery);
  }

  @Get(':id')
  getRpgInfo(@Param('id') id: string) {
    return this.rpgService.getRpgInfo(id);
  }

  @Get(':id/items')
  getRpgItems(@Param('id') id: string) {
    return this.rpgService.getRpgItems(id);
  }

  @Get(':id/item/:itemId')
  getRpgItemInfo(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.rpgService.getRpgItemInfo(id, itemId);
  }

  //protected routes
  @Post()
  createRpgSystem() {
    return this.rpgService.createRpg();
  }

  @Patch(':id')
  updateRpgSystym() {
    return this.rpgService.updateRpgInfo();
  }
}
