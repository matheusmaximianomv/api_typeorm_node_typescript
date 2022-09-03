import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

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
