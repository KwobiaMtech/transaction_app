import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PaginatedTransaction, Transaction} from '../model/transaction.interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions$: Observable<PaginatedTransaction> = this.getTransactions();
  constructor(private http: HttpClient) {}




  addTransaction(transaction: Transaction): Observable<Transaction> {
   return this.http.post<Transaction>(environment.api_url + '/api/transactions/add', transaction);
   // return this.addedTransaction$ = this.http.post<Transaction>(this.apiUrl + '/api/transactions/add', transaction);
  }

  getTransactions(page: number = 1, limit: number = 10): Observable<PaginatedTransaction> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    return this.http.get<PaginatedTransaction>(environment.api_url + '/api/transactions', {params});

  }

}
