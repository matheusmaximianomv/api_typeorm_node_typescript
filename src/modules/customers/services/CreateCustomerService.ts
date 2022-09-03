import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute(data: IRequest): Promise<Customer> {
    const { email, name } = data;
    const customerRepository = getCustomRepository(CustomerRepository);

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already user.');
    }

    const customer = customerRepository.create({
      email,
      name,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
