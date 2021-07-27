import { TransactionEntity } from './transaction.entity';


export class PaginatedTransactionResultDto {
  data: TransactionEntity[];
  page?: number;
  limit?: number;
  totalCount?: number;
}
