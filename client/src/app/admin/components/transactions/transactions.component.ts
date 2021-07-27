import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';
import {PaginatedTransaction} from '../../../model/transaction.interface';
import {Observable} from 'rxjs';
import {TransactionModel} from '../../../store/state/transaction.state';
import {Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactionAdded$: Observable<TransactionModel>;
  paginatedTransactions$: Observable<PaginatedTransaction> = this.transactionService.transactions$;



    constructor(private transactionService: TransactionService, private store: Store) {
    this.transactionAdded$ = this.store.select(state => state.add_transaction.addedTransaction);
  }

   ngOnInit(): any{
    this.transactionAdded$.pipe(
        tap((transaction: TransactionModel) => {
            if (transaction){
               this.paginatedTransactions$ = this.transactionService.getTransactions();
            }

        })
    ).subscribe();

   }

}
