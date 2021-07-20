import { IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;
}
