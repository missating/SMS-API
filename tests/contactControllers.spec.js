process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import {testDB} from '../config';

const request = supertest(app);

describe('Contact API', () => {
  before((done) => {
    mongoose.connect(testDB, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    done();
  });

  it('should not add a contact without a name', (done) => {
    request.post('/api/v1/contact/register')
    .send({
      name: '',
      phoneNumber: '08167086899'
    })
    .end((error, response) => {
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.errors.name)
        .to.equal(`Contact's name is required`);
      done();
    });
  });


  it('should not add a contact without a phonenumber', (done) => {
    request.post('/api/v1/contact/register')
      .send({
        name: 'name',
        phoneNumber: ''
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.phoneNumber)
          .to.equal(`Contact's phone number is required`);
        done();
      });
  });

  it('should add a contact if the name and phone number is provided', (done) => {
    request.post('/api/v1/contact/register')
      .send({
        name: 'name',
        phoneNumber: '08167086833'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an('object');
        console.log(response.body)
        expect(response.body.data.contact).to.have.property('id');
        expect(response.body.data.contact).to.have.property('name');
        expect(response.body.data.contact).to.have.property('phoneNumber');
        done();
      });
  });

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});