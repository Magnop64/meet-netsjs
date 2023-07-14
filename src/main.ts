import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:['debug','error','log']
  });

  app.enableCors();// politica de cors , define quem pode ter acesso a api

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
      whitelist : true,
      forbidNonWhitelisted : false // recebe nosso panload  tratar os caracteres vazios , anula o retorno de erros caso vazio.
    })
  );

  app.setGlobalPrefix('api'); // define o caminho da rota.

  await app.listen(3000);
}
bootstrap();
