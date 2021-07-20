import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-route.module';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AddTransactionModalComponent} from './components/add-transaction-modal/add-transaction-modal.component';
import {PaginatedTableComponent} from './components/paginated-table/paginated-table.component';
import {TransactionCardComponent} from './components/transaction-card/transaction-card.component';





@NgModule({
  declarations: [
      TransactionsComponent,
      AddTransactionModalComponent,
      PaginatedTableComponent,
      TransactionCardComponent,
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AdminRoutingModule,
    ]
})
export class AdminModule { }
