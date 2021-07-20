import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../model/transaction.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/model/user.inteface';
import { Transaction } from '../model/transaction.interface';
import { from, map, Observable, switchMap } from 'rxjs';
import { TransactionDto, TransactionType } from '../model/transaction.dto';

import { PaginationDto } from '../model/PaginationDto';
import { PaginatedTransactionResultDto } from '../model/PaginatedTransactionResult';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  create(user: User, transaction: TransactionDto): Observable<Transaction> {
    return from(this.getUserInitialTransaction(user)).pipe(
      switchMap((initialTransaction: Transaction) => {
        switch (transaction.transaction_type) {
          case TransactionType.DEPOSIT:
            return from(
              this.depositAccount(initialTransaction, transaction, user),
            );
          case TransactionType.WITHDRAW:
            return from(
              this.withDrawAccount(initialTransaction, transaction, user),
            );
          default:
            return from(
              this.raiseException(
                'Transaction Type Error',
                HttpStatus.BAD_REQUEST,
              ),
            );
        }
      }),
    );
  }

  withDrawAccount(
    initialTransaction: Transaction,
    incomingTransaction: TransactionDto,
    user: User,
  ): Observable<Transaction> {
    if (initialTransaction) {
      if ( Number(initialTransaction.account_balance) >= Number(incomingTransaction.amount)) {
        const new_transaction = new TransactionEntity();
        new_transaction.owner = user;
        new_transaction.description = incomingTransaction.description;
        new_transaction.amount_withdrawn = incomingTransaction.amount;
        new_transaction.account_balance =
          Number(initialTransaction.account_balance) -
          Number(incomingTransaction.amount);
        return from(this.transactionRepository.save(new_transaction)).pipe(
          map((transaction: TransactionEntity) => {
            const { owner, ...result } = transaction;
            return result;
          }),
        );
      }
    }
    this.raiseException('Not Enough Balance', HttpStatus.BAD_REQUEST);
  }

  depositAccount(
    initialTransaction: Transaction,
    incomingTransaction: TransactionDto,
    user: User,
  ): Observable<Transaction | any> {
    console.log('get initial transaction');
    console.log(initialTransaction);
    const new_transaction = new TransactionEntity();
    new_transaction.owner = user;
    new_transaction.description = incomingTransaction.description;
    new_transaction.amount_deposited = incomingTransaction.amount;
    new_transaction.account_balance = initialTransaction
      ? Number(initialTransaction.account_balance) +
        Number(incomingTransaction.amount)
      : incomingTransaction.amount;
    return from(this.transactionRepository.save(new_transaction)).pipe(
      map((transaction: TransactionEntity) => {
        const { owner, ...result } = transaction;
        return result;
      }),
    );
  }

  test(user: User): Observable<Transaction> {
    return from(this.getUserInitialTransaction(user)).pipe(
      map((transaction: Transaction) => {
        return transaction;
      }),
    );
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

  checkTransactionType(type): void {
    if (!Object.values(TransactionType).includes(type)) {
      this.raiseException('Transaction Type Not Found', HttpStatus.NOT_FOUND);
    }
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
