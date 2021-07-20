import {Component, Input, OnInit} from '@angular/core';
import {PaginatedTransaction} from '../../../model/transaction.interface';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TransactionModel} from '../../../store/state/transaction.state';
import {TransactionService} from '../../../services/transaction.service';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements OnInit {

  @Input() transactions: any;

 // closed: boolean;
 // transactions: PaginatedTransaction | any;
  paginatedTransactions$: Observable<PaginatedTransaction> = this.transactionService.getTransactions();
  transactions$: Observable<TransactionModel>;
  currentPage: number;
  totalPageLinks: number;
  pages: Array<string> = [];


  constructor(
      public transactionService: TransactionService,
      private store: Store
  ) {
    // this.closed = false;
    this.currentPage = 1;
    this.totalPageLinks = 0;
    this.transactions$ = this.store.select(state => state.add_transaction.transaction);
  }

  async ngOnInit(): Promise<void> {
    this.setPages(this.transactions.totalCount, this.transactions.limit, 'first');
    this.transactions$.pipe(
        map((transactions) => {
          if (transactions){
            this.getPaginatedTransactions();
          }
        })
    ).subscribe();

  }


  getPaginatedTransactions(type?: string): void {
    this.transactionService.getTransactions().pipe(
        map((response: PaginatedTransaction) => {
          this.transactions = response;
          this.setPages(this.transactions.totalCount, this.transactions.limit, type);
        })
    ).subscribe();
  }

  setPages(count: number, limit?: number, type?: string): void {
    const pages = [];
    const pageLimit: any = limit;
    let pageCount = Number(count / pageLimit);
    const tempCount = Number(count % pageLimit);
    if (tempCount !== 0 && tempCount < count){
      pageCount++;
    }
    if (type === 'first'){
      this.totalPageLinks = pageCount;
    }
    for (let i = 1; i <= pageCount; i++) {
      pages.push(String(i));
    }
    this.pages = pages;
  }

  nextPrevPage(limit?: number, event?: any, type = 'next'): void{
    event.preventDefault();
    if (this.currentPage > this.totalPageLinks){
      this.currentPage = this.currentPage - 1;
    }
    const sendingPage = type === 'next' ? Number(this.currentPage) + 1 : Number(this.currentPage) - 1;
    if (sendingPage === 1 || sendingPage > 0){
      this.paginate(sendingPage, limit);
    }

  }


  paginate(page?: string|number, limit?: number, event?: Event): void{
    this.currentPage = Number(page);
    if (event){
      event?.preventDefault();
    }

    this.transactionService.getTransactions(Number(page), Number(limit)).pipe(
        tap((transactions: PaginatedTransaction) => {
          if (transactions.data.length > 0){
            this.transactions = transactions;
            this.setPages(this.transactions.totalCount, limit);
          }
        })
    ).subscribe();

  }

  getNewPaginatedTransactions(page?: number, limit?: number): void {
    this.transactionService.getTransactions(page, limit).pipe(
        map((response: PaginatedTransaction) => {
          this.transactions = response;
          this.setPages(this.transactions.totalCount, limit);
        })
    ).subscribe();
  }

}