import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';
import { errors } from 'celebrate';

import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import UploadConfig from '@config/upload';

import routes from './routes';

const app = express();
const network = (networkInterfaces() as any).enp8s0[0] as NetworkInterfaceInfo;
const PORT = process.env.PORT || '3333';

app.use(cors());
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    } else if (error) {
      return response
        .status(500)
        .json({ status: 'error', message: 'Internal Server error' });
    }

    return next();
  },
);

app.listen(3333, () => {
  console.log(
    `Server started in http://localhost:${PORT} or http://${network.address}:${PORT} 🏆`,
  );
});
