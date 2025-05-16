import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Eliminar propiedades no declaradas en el DTO
      forbidNonWhitelisted: true,  // Lanzar error si se pasan propiedades no permitidas
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();