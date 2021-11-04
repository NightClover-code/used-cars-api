import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const uniqueEmail = 'zoibv@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ uniqueEmail, password: '123' })
      .expect(201);

    const { email, id } = res.body;

    expect(id).toBeDefined();
    expect(email).toEqual(uniqueEmail);
  });
});
