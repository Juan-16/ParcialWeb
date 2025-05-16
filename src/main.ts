import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:5173',  // Permitir solicitudes solo desde tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Encabezados permitidos
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