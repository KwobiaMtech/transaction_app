import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';
import {PaginatedTransaction } from '../../../model/transaction.interface';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  paginatedTransactions$: Observable<PaginatedTransaction> = this.transactionService.getTransactions();


  constructor(private transactionService: TransactionService) {}

   ngOnInit(): any{}}
