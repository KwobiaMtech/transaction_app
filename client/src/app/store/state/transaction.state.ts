import {State, Action, StateContext } from '@ngxs/store';
import {AddTransaction } from '../actions/transaction.actions';
import {Transaction} from '../../model/transaction.interface';


export interface TransactionModel {
    addedTransaction: Transaction;
}

@State<TransactionModel | object>({
    name: 'add_transaction',
    defaults: {
        transaction: null
    }
})

export class TransactionState{

    @Action(AddTransaction)
    addTransaction({getState, patchState}: StateContext<TransactionModel>, {payload}: AddTransaction): any{
        const state = getState();
        patchState({
            addedTransaction: payload
        });
    }
}
