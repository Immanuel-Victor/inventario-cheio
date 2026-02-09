import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Rpg } from './entities/rpg.entity';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entity/item.entity';

@Injectable()
export class RpgService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(Rpg) private readonly rpgRepository: Repository<Rpg>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}
  async getAllRpgs(paginationQuery?: QueryPaginationDto) {
    const rpgs = await this.rpgRepository.find();

    const paginatedData = this.paginationService.returnPaginatedData<Rpg>(
      rpgs,
      paginationQuery,
    );

    return paginatedData;
  }

  async getRpgInfo(id: string) {
    const rpg = await this.rpgRepository.findOne({ where: { id } });
    if (!rpg) {
      throw new NotFoundException('Rpg not found');
    }
    return rpg;
  }

  async createRpg() {}

  async updateRpgInfo() {}

  async getRpgItems(id: string, paginationQuery?: QueryPaginationDto) {
    console.log(id);
    const items = await this.itemRepository.find({
      where: {
        rpgId: id,
      },
    });

    const paginatedData = this.paginationService.returnPaginatedData<Item>(
      items,
      paginationQuery,
    );

    return paginatedData;
  }

  async getRpgItemInfo(id: string, itemId: string) {
    const item = await this.itemRepository.findOne({
      where: {
        rpgId: id,
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }
}
