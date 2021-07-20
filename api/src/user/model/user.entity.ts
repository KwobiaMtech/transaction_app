import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from '../../transaction/model/transaction.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  full_name?: string;

  @Column({ unique: true })
  username?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ select: false })
  password?: string;

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.owner,
  )
  transactions?: TransactionEntity[];
}
