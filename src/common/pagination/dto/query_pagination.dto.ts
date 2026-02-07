import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class QueryPaginationDto {
  @IsNumber()
  @Min(0)
  @Max(25)
  @IsOptional()
  offset: number = 0;

  @IsNumber()
  @Min(10)
  @Max(25)
  @IsOptional()
  limit: number = 10;
}
