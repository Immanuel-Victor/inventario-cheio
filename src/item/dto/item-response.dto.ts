import { ItemCategory } from '../enum/item-category.enum';

export class ItemResponseDto {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  price: number;
  weight: number;
}
