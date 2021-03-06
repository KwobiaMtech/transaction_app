import {Component, Input, OnInit} from '@angular/core';
import {PaginatedTransaction} from '../../../model/transaction.interface';
import { tap} from 'rxjs/operators';
import {TransactionService} from '../../../services/transaction.service';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements OnInit {

  @Input() transactions: PaginatedTransaction | any;
  currentPage: number;
  totalPageLinks: number;
  pages: Array<string> = [];



  constructor(
      public transactionService: TransactionService,
      private store: Store
  ) {
    this.currentPage = 1;
    this.totalPageLinks = 0;
  }

  async ngOnInit(): Promise<void> {
    console.log('get init transactions');
    console.log(this.transactions);
    this.setPages(this.transactions?.totalCount, this.transactions?.limit, 'first');
  }


 /* getPaginatedTransactions(type?: string): void {
    this.transactionService.getTransactions().pipe(
        tap((response: PaginatedTransaction) => {
          this.transactions = response;
          this.setPages(this.transactions.totalCount, this.transactions.limit, type);
        })
    ).subscribe();
  }*/

  setPages(count?: any, limit?: number, type?: string): void {
    const pages = [];
    const pageLimit: any = limit;
    let pageCount = Number(count / pageLimit);
    const tempCount = Number(count % pageLimit);
    if (tempCount !== 0 && tempCount < count){
      pageCount++;
    }
    pageCount = (pageCount < 1) ? 1 : pageCount;

    if (type === 'first'){
      this.totalPageLinks =  pageCount;
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

}
