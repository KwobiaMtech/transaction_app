import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {

  @Input() transactions: any;
  constructor() { }

  ngOnInit(): void {
  }

}
