import { Module } from '@nestjs/common';
import { RpgController } from './rpg.controller';
import { RpgService } from './rpg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rpg } from './entities/rpg.entity';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { Item } from 'src/item/entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rpg, Item])],
  controllers: [RpgController],
  providers: [RpgService, PaginationService],
})
export class RpgModule {}
