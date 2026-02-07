import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConf = new DocumentBuilder()
    .setTitle('Inventário Cheio')
    .setDescription(
      'Esse documento descreve as interações, requisições e respostas da api do Inventário Cheio',
    )
    .setVersion('0.1')
    .addTag('RPG', 'Rotas referentes a RPGs')
    .addTag('Items', 'Rotas referentes a items de rpgs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
