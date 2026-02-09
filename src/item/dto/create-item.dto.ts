import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Item } from '../entity/item.entity';
import { ItemCategory } from '../enum/item-category.enum';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ItemCategory)
  @IsNotEmpty()
  category: ItemCategory;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  rpgId: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsString()
  @IsNotEmpty()
  damageScore?: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsNumber()
  @IsNotEmpty()
  critThreshold?: number;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsNumber()
  @IsNotEmpty()
  critMultiplier?: number;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsString()
  @IsNotEmpty()
  reach?: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsString()
  @IsNotEmpty()
  neededWeaponProficiency?: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.WEAPON)
  @IsString()
  @IsNotEmpty()
  damageType?: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.ARMOR)
  @IsString()
  @IsNotEmpty()
  neededArmorProficiency?: string;

  @ValidateIf((o: Item) => o.category === ItemCategory.ARMOR)
  @IsNumber()
  @IsNotEmpty()
  protectionScore?: number;

  @ValidateIf((o: Item) => o.category === ItemCategory.ARMOR)
  @IsNumber()
  @IsNotEmpty()
  movementPenalty?: number;

  @ValidateIf((o: Item) => o.category === ItemCategory.ARMOR)
  @IsString()
  @IsNotEmpty()
  armorCategory?: string;
}
