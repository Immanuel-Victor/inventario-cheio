import { Body, Controller, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }
}
