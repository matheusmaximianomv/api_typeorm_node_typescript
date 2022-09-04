import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute(data: IRequest): Promise<Order> {
    const { id } = data;
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not exists');
    }

    return order;
  }
}

export default ShowOrderService;
