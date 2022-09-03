import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute(data: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(data.id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
