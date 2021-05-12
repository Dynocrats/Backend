import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

const server = express();

export const createNestServer = async (expressInstance) => {

  admin.initializeApp({
    databaseURL: "https://travelmate-620f4-default-rtdb.firebaseio.com/",
    credential: admin.credential.applicationDefault()
  })

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Api ready'))
  .catch((err) => console.error('Api initialization failed', err));

export const api = functions.https.onRequest(server);
