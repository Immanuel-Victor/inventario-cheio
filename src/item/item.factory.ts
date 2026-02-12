import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemCategory } from './enum/item-category.enum';
import { Weapon } from './entity/weapon.entity';
import { Armor } from './entity/armor.entity';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemFactory {
  create(createItemDto: CreateItemDto): Item {
    switch (createItemDto.category) {
      case ItemCategory.ARMOR: {
        const newArmor = new Armor();
        Object.assign(newArmor, createItemDto);
        return newArmor;
      }
      case ItemCategory.WEAPON: {
        const newWeapon = new Weapon();
        Object.assign(newWeapon, createItemDto);
        return newWeapon;
      }
      case ItemCategory.CLOTHING:
      case ItemCategory.FOOD:
      case ItemCategory.CONSUMABLE: {
        const newItem = new Item();
        Object.assign(newItem, createItemDto);
        return newItem;
      }
      default: {
        const newItem = new Item();
        Object.assign(newItem, createItemDto);
        return newItem;
      }
    }
  }
}
