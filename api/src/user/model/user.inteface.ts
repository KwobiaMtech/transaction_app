import { Transaction } from '../../transaction/model/transaction.interface';

export interface User {
  id?: string;
  full_name?: string;
  username?: string;
  email?: string;
  password?: string;
  transaction?: Transaction[];
}
