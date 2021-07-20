import { UserEntity } from '../../user/model/user.entity';
import { User } from '../../user/model/user.inteface';

export interface Transaction {
  amount_withdrawn?: number;
  amount_deposited?: number;
  account_balance?: number;
  description?: string;
  owner?: User;
}
