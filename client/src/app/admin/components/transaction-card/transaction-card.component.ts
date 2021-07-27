import {Component, Input, OnInit} from '@angular/core';
import {PaginatedTransaction} from '../../../model/transaction.interface';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {

  @Input() transactions: PaginatedTransaction | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
