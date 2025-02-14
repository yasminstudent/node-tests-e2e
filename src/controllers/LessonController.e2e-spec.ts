import request from 'supertest';
import { app } from '../app';

test('[e2e] CreateLesson', async () => {
    //simula uma requisição
    const response = await request(app)
        .post('/lessons')
        .send({ title: 'Nova aula'});

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
});