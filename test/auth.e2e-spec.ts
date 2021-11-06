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
    const uniqueEmail = 'zobcasc@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: uniqueEmail, password: '123' })
      .expect(201);

    const { email, id } = res.body;

    expect(id).toBeDefined();
    expect(email).toEqual(uniqueEmail);
  });

  it('signup as a new user and get the current user', async () => {
    const uniqueEmail = 'someone@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: uniqueEmail, password: '123' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .post('/auth/whoami')
      .send({ email: uniqueEmail, password: '123' })
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(uniqueEmail);
  });
});
