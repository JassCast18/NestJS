import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mi documentacion API')
    .setDescription('Esto es para la exposicion 2 de Desarrollo web')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
  
}
bootstrap();
