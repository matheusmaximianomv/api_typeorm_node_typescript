import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordsRouter from '@modules/users/routes/password.routes';
import profilesRouter from '@modules/users/routes/profiles.routes';
import customerRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello World!!!' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/passwords', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/customers', customerRouter);

routes.get('*', (request, response) => {
  return response.status(400).json({ message: 'Invalid params.' });
});

export default routes;
