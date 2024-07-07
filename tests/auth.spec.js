// tests/auth.spec.js
const request = require('supertest');
const app = require('../src/index'); // Assuming this is the main entry point

describe('Auth Endpoints', () => {
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  // Add more test cases as required
});
