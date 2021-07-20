import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../../services/transaction.service';
import { map,  tap} from 'rxjs/operators';
import {PaginatedTransaction, Transaction} from '../../../model/transaction.interface';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {TransactionModel} from '../../../store/state/transaction.state';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


  paginatedTransactions$: Observable<PaginatedTransaction> = this.transactionService.getTransactions();

  @ViewChild('closeButton') closeButton: any;


  constructor(private transactionService: TransactionService) {
  }

   ngOnInit(): any{}}
