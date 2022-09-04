import { Request, Response } from 'express';

import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({ customer_id, products });

    return response.status(201).json(order);
  }
}

export default OrdersController;
