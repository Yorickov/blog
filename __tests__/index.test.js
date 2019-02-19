import request from 'supertest';
import app from '../src';

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

  it('show posts and forms', async () => {
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

  it('POST/PATCH posts errors', async () => {
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
});
