import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJs para los Papus')
    .setDescription('Esto es para la exposicion 2 de Desarrollo web')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('items')
    //.addTag('users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
    origin: 'http://localhost:5173', // URL de tu frontend
    credentials: true,               // permite cookies si las usas
  });
  await app.listen(3000);

}
bootstrap();
