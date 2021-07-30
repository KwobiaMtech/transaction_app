import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../../services/transaction.service';
import {Store} from '@ngxs/store';
import {AddTransaction } from '../../../store/actions/transaction.actions';
import {Transaction} from '../../../model/transaction.interface';
import {catchError, tap} from 'rxjs/operators';


@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.css']
})
export class AddTransactionModalComponent implements OnInit {
  transactionForm: FormGroup | any;
  closed: boolean;
  transactionFailed: any;
  @ViewChild('closeButton') closeButton: any;

  constructor(public formBuilder: FormBuilder, public transactionService: TransactionService, private store: Store) {
    this.closed = false;
    this.transactionForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.pattern('^[0-9\.]*$')]],
      transaction_type: ['deposit', [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get getControl(): any{
    return this.transactionForm.controls;
  }

  onSubmit(): any {
    if (this.transactionForm.valid){
      this.transactionService.addTransaction(this.transactionForm.value).pipe(
          tap((response: Transaction) => {
            this.store.dispatch(new AddTransaction(response));
            this.transactionForm.reset();
            this.closeButton.nativeElement.click();
          }),
          catchError((error) => {
            this.transactionFailed = error.error.message;
            setTimeout(() => {
              this.transactionFailed = false;
            }, 1500);
            return error;
          })
      ).subscribe();
    }
  }

}
