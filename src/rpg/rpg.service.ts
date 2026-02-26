import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Rpg } from './entities/rpg.entity';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entity/item.entity';
import { PaginatedDataDto } from 'src/common/pagination/dto/paginated-data.dto';
import { UpdateRpgDto } from './dto/update-rpg.dto';
import { CreateRpgDto } from './dto/create-rpg.dto';

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

  async createRpg(createRpgDto: CreateRpgDto) {
    const alreadyExists = await this.rpgRepository.findOne({
      where: {
        name: createRpgDto.name,
        author: createRpgDto.author,
        publisher: createRpgDto.publisher,
      },
    });

    if (alreadyExists) {
      throw new ConflictException('Rpg already exists');
    }

    const newRpg = this.rpgRepository.create(createRpgDto);

    return await this.rpgRepository.save(newRpg);
  }

  async updateRpgInfo(id: string, rpg: UpdateRpgDto) {
    const exists = await this.rpgRepository.findOne({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Rpg not found');
    }
    await this.rpgRepository.update({ id }, rpg);

    return await this.rpgRepository.findOne({
      where: { id },
    });
  }

  async deleteRpg(id: string) {
    const result = await this.rpgRepository.delete({
      id,
    });

    if (!result.affected) {
      throw new NotFoundException('Rpg not found');
    }

    return result;
  }

  async getRpgItems(
    id: string,
    paginationQuery?: QueryPaginationDto,
  ): Promise<PaginatedDataDto<Item>> {
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
