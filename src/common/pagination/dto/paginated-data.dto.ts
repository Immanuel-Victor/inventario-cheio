import { Expose } from 'class-transformer';

export class PaginatedDataDto<T> {
  @Expose()
  totalItems: number;
  @Expose()
  data: T[];
  @Expose()
  limit: number;
  @Expose()
  offset: number;
  @Expose()
  hasNext: boolean;
}
