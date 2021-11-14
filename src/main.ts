import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiSwaggerConfig } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { description, tag, title, version, endpoint } = apiSwaggerConfig;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag(tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(endpoint, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
