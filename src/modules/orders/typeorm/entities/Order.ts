import {
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Customer from '@modules/customers/typeorm/entities/Customer';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  public customer!: Customer;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;
}

export default Order;
