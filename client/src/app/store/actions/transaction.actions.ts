import {Transaction} from '../../model/transaction.interface';

export class TransactionStatus {
    static readonly  type = '[TRANSACTIONS] TransactionStatus';
    constructor(public payload: Transaction) {}
}

export class AddTransaction {
    static readonly  type = '[TRANSACTIONS] AddTransaction';
    constructor(public payload: Transaction) {}
}
