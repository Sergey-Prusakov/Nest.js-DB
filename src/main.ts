import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://127.0.0.1:5500',
      'https://t2.academy.dunice-testing.com',
      'https://t1.academy.dunice-testing.com/',
    ],
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
