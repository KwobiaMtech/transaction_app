import { IsNotEmpty, Min } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  transaction_type: TransactionType;

  @Min(1)
  @IsNotEmpty()
  amount?: number;
}

export enum TransactionType {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}
