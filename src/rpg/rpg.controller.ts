import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { RpgService } from './rpg.service';
import { Public } from 'src/common/decorators/is-public.decorator';
import { CreateRpgDto } from './dto/create-rpg.dto';
import { UpdateRpgDto } from './dto/update-rpg.dto';

@Controller('rpg')
export class RpgController {
  constructor(private readonly rpgService: RpgService) {}

  @Public()
  @Get()
  getAllRpgs(@Query() paginationQuery?: QueryPaginationDto) {
    return this.rpgService.getAllRpgs(paginationQuery);
  }

  @Public()
  @Get(':id')
  getRpgInfo(@Param('id') id: string) {
    return this.rpgService.getRpgInfo(id);
  }

  @Public()
  @Get(':id/items')
  getRpgItems(@Param('id') id: string) {
    return this.rpgService.getRpgItems(id);
  }

  @Public()
  @Get(':id/item/:itemId')
  getRpgItemInfo(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.rpgService.getRpgItemInfo(id, itemId);
  }

  //protected routes
  @Post()
  createRpgSystem(@Body() createRpgDto: CreateRpgDto) {
    return this.rpgService.createRpg(createRpgDto);
  }

  @Patch(':id')
  updateRpgSystem(@Param('id') id: string, @Body() updateRpgDto: UpdateRpgDto) {
    return this.rpgService.updateRpgInfo(id, updateRpgDto);
  }

  @Delete(':id')
  deleteRpgSystem(@Param('id') id: string) {
    return this.rpgService.deleteRpg(id);
  }
}
