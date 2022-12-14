import { EntityRepository, Repository } from 'typeorm';

import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createrOrder(newOrder: ICreateOrder): Promise<Order> {
    const { customer, products } = newOrder;

    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
