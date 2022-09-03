import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateProfileService {
  public async execute(data: IRequest): Promise<Customer> {
    const { name, email, id } = data;

    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    if (
      email &&
      email !== customer.email &&
      (await customerRepository.findByEmail(email))
    ) {
      throw new AppError('There is already one user with this email.');
    }

    customer.email = email;

    if (name) {
      customer.name = name;
    }

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateProfileService;
