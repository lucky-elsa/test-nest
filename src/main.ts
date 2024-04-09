import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const validationPipeService = require('@pipets/validation-pipes');

async function bootstrap() {
  try {
    validationPipeService();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true, // Strip away non-whitelisted properties
        forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
        transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
        validationError: { target: false }, // Don't return the values in the error response
        transformOptions: {
          enableImplicitConversion: true, // Allow implicit conversion based on the type of the DTO properties
        },
      }
    ));
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch(err) {

  }
}
bootstrap();
