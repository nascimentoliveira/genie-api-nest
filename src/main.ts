import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validationExceptionFactory = (errors: ValidationError[]) => {
    const errorMessages = errors.flatMap((error) =>
      Object.values(error.constraints),
    );
    return new HttpException(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: errorMessages,
        error: 'Unprocessable Entity',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  };
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Genie-API')
    .setDescription('Documentação de Genie-API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
