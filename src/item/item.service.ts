import { Injectable } from '@nestjs/common';
import { ItemFactory } from './item.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entity/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemFactory: ItemFactory,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async createItem(createItemDto: CreateItemDto) {
    const item = this.itemFactory.create(createItemDto);

    const createdItem = await this.itemRepository.save(item);

    return createdItem;
  }
}
