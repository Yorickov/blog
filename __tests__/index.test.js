import request from 'supertest';
import app from '../server';

describe('requests', () => {
  let server;

  beforeEach(async () => {
    server = app();
  });

  it('root', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('show posts forms', async () => {
    await request(server)
      .get('/posts')
      .expect(200);
    await request(server)
      .get('/posts/1')
      .expect(200);
    await request(server)
      .get('/posts/new')
      .expect(200);
  });

  it('edit forms', async () => {
    const res = await request(server)
      .post('/posts')
      .type('form')
      .send({ title: 'post title', body: 'post body' })
      .expect(302);
    const url = res.headers.location.split('/').slice(0, -1).join('/');
    await request(server)
      .get(url)
      .expect(200);
    const url2 = res.headers.location.match(/\/posts\/2/)[0];
    await request(server)
      .patch(url2)
      .type('form')
      .send({ title: 'new post title', body: 'new post body' })
      .expect(302);
    await request(server)
      .delete(url2)
      .expect(302);
  });

  it('add/edit posts errors', async () => {
    await request(server)
      .post('/posts')
      .expect(422);
    const res = await request(server)
      .post('/posts')
      .type('form')
      .send({ title: 'post title', body: 'post body' })
      .expect(302);
    const url = res.headers.location.match(/\/posts\/\d+/)[0];
    await request(server)
      .patch(url)
      .expect(422);
  });
  it('new user/session form', async () => {
    await request(server)
      .get('/users/new')
      .expect(200);
    await request(server)
      .get('/session/new')
      .expect(200);
  });

  it('create user', async () => {
    await request(server)
      .post('/users')
      .type('form')
      .send({ nickname: 'user', password: 'pass2' })
      .expect(302);
  });

  it('create session', async () => {
    await request(server)
      .post('/session')
      .type('form')
      .send({ nickname: 'admin', password: 'pass' })
      .expect(302);
  });

  it('create session error', async () => {
    await request(server)
      .post('/session')
      .type('form')
      .send({ nickname: 'admin', password: 'pass2' })
      .expect(422);
  });

  it('sign out', async () => {
    const res = await request(server)
      .post('/session')
      .type('form')
      .send({ nickname: 'admin', password: 'pass' })
      .expect(302);
    const cookie = res.headers['set-cookie'];
    await request(server)
      .delete('/session')
      .set('Cookie', cookie)
      .expect(302);
  });
});
