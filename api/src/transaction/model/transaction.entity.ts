import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/model/user.entity';

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 8, scale: 2, nullable: false, default: 0 })
  amount_withdrawn: number;

  @Column('decimal', { precision: 8, scale: 2, nullable: false, default: 0 })
  amount_deposited: number;

  @Column('decimal', { precision: 8, scale: 2, nullable: false, default: 0 })
  account_balance = 0;

  @Column()
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  owner?: UserEntity;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
