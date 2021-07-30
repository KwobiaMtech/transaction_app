import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../model/transaction.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/model/user.inteface';
import { Transaction } from '../model/transaction.interface';
import { from, map, Observable, switchMap } from 'rxjs';
import { TransactionDto, TransactionType } from '../model/transaction.dto';

import { PaginatedTransactionResultDto } from '../model/PaginatedTransactionResult';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}


  create(
      user: User, transaction: TransactionDto
  ): Observable<Transaction> {

    return from(this.getUserInitialTransaction(user)).pipe(
        switchMap((initialTransaction: Transaction) => {
          if(transaction.transaction_type === TransactionType.WITHDRAW){
            if ( Number(initialTransaction.account_balance) < Number(transaction.amount)) {
              this.raiseException('Not Enough Balance', HttpStatus.BAD_REQUEST);
            }
          }
          const new_transaction = new TransactionEntity();
          new_transaction.owner = user;
          new_transaction.description = transaction.description;
          if(transaction.transaction_type === TransactionType.WITHDRAW){
              new_transaction.amount_withdrawn = transaction.amount;
          }else{
              new_transaction.amount_deposited = transaction.amount;
          }
          new_transaction.account_balance = this.getAccountBalance(initialTransaction,transaction);
          return from(this.transactionRepository.save(new_transaction)).pipe(
              map((transaction: TransactionEntity) => {
                const { owner, ...result } = transaction;
                return result;
              }),
          );
        })

    );

  }

  getAccountBalance(
      initialTransaction: Transaction,
      incomingTransaction: TransactionDto,
  ): number {

    switch (incomingTransaction.transaction_type) {
      case TransactionType.DEPOSIT:
        return initialTransaction
            ? Number(initialTransaction.account_balance) +
            Number(incomingTransaction.amount)
            : incomingTransaction.amount;

      case TransactionType.WITHDRAW:
       return Number(initialTransaction.account_balance) - Number(incomingTransaction.amount);
      default:
        from(
            this.raiseException(
                'Transaction Type Error',
                HttpStatus.BAD_REQUEST,
            ),
        );
    }

  }

  getUserInitialTransaction(user: User): Observable<Transaction> {
    return from(
      this.transactionRepository.findOne({
        where: [{ owner: user }],
        order: {
          id: 'DESC',
        },
      }),
    );
  }

  raiseException(message, status: HttpStatus): Observable<any> {
    throw new HttpException(message, status);
  }

  async usersPaginatedTransactions(
      user: User,
      paginationDto: { limit: number; page: number },
  ): Promise<any> {
    const paginatedResult = new PaginatedTransactionResultDto();
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = this.transactionRepository.count({
      where: [{ owner: user }],
    });
    paginatedResult.totalCount = await totalCount;
    const data = this.transactionRepository.find({
      where: { owner: user },
      order: {
        created_at: 'DESC',
      },
      skip: skippedItems,
      take: paginationDto.limit,
    });
    paginatedResult.data = await data;
    paginatedResult.page = paginationDto.page;
    paginatedResult.limit = paginationDto.limit;
    return paginatedResult;
  }
}
