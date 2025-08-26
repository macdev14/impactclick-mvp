import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for widget integration
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'https://your-domain.com',
      'https://impactclick.softechcom.com',
      'https://dashboard-eyy27lh5t-lauro-pimentels-projects.vercel.app',
      'https://dashboard-6x95tvx8g-lauro-pimentels-projects.vercel.app',
      'https://backend-r26dorhkq-lauro-pimentels-projects.vercel.app',
      'https://backend-mqru8qxeq-lauro-pimentels-projects.vercel.app'
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('ImpactClick API')
    .setDescription('CSR Gamified Advertising Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 ImpactClick API running on port ${port}`);
  console.log(`📚 API Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
