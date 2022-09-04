import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute(data: IRequest): Promise<Order> {
    const { customer_id, products } = data;

    const orderRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);

    // Verificando se o cliente existe
    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Cold not find any customer with the given id.');
    }

    // Verificando se todos os produtos existe
    const existsProducts = await productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Cold not find product ${checkInexistentsProducts[0]}`,
      );
    }

    // Verificando se a quantidade solicitada não é maior que a quantidade atual
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(existProduct => existProduct.id === product.id)[0]
          .quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    // Criando instância da entidade de produtos
    const serializeProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(
        existProduct => existProduct.id === product.id,
      )[0].price,
    }));

    const order = await orderRepository.createrOrder({
      customer: customerExists,
      products: serializeProducts,
    });

    // Atualizando a quantidade de produtos
    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(existProduct => existProduct.id === product.id)[0]
          .quantity - product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
