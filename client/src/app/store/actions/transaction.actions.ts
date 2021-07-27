import {Transaction} from '../../model/transaction.interface';


export class AddTransaction {
    static readonly  type = '[TRANSACTIONS] AddTransaction';
    constructor(public payload: Transaction) {}
}
