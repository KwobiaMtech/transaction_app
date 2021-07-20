import { TransactionEntity } from './transaction.entity';
import {Transaction} from "./transaction.interface";

export class PaginatedTransactionResultDto {
  data: TransactionEntity[];
  page?: number;
  limit?: number;
  totalCount?: number;
}
