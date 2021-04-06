process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');

describe('Teacher Routes', () => {
  let teacher;
  it('Get All Teachers.', (done) => {
    request(app)
      .get('/admin/teacher')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        teacher = res.body[0];
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Get fake Teacher.', (done) => {
    request(app)
      .get('/admin/teacher/fakeid')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body.errors[0].message).to.be.equal(
          'Nothing found for that ID'
        );
        done();
      });
  });
  it('Get Actual Teacher.', (done) => {
    request(app)
      .get(`/admin/teacher/${teacher._id}`)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
