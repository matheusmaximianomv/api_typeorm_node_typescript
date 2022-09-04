import {
  Column,
  OneToMany,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  public order_products!: OrdersProducts[];

  @Column({ length: 250 })
  public name!: string;

  @Column('decimal')
  public price!: number;

  @Column('int')
  public quantity!: number;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;
}

export default Product;
