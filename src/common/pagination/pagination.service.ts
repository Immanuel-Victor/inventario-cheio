import { Injectable } from '@nestjs/common';
import { QueryPaginationDto } from './dto/query_pagination.dto';
import { PaginatedDataDto } from './dto/paginated-data.dto';

@Injectable()
export class PaginationService {
  returnPaginatedData<T>(
    data: T[],
    paginationDto?: QueryPaginationDto,
  ): PaginatedDataDto<T> {
    const { limit = 10, offset = 0 } = paginationDto || {};
    return {
      totalItems: data.length,
      data: data.slice(offset, offset + limit),
      limit,
      offset,
      hasNext: Math.floor((data.length - offset) / limit) > 0,
    };
  }
}
