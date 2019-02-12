process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import { testDB } from '../config';

const request = supertest(app);

describe('SMS API', () => {
  before((done) => {
    mongoose.connect(testDB, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    done();
  });

  it(`should not send a message without the sender's number`, (done) => {
    request.post('/api/v1/sms')
      .send({
        senderNumber: '',
        receiverNumber: '08167086899',
        message: 'Test Message'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.senderNumber)
          .to.equal(`Sender\'s phone number is required`);
        done();
      });
  });

  it(`should not send a message without the receiver's number`, (done) => {
    request.post('/api/v1/sms')
      .send({
        senderNumber: '08167086899',
        receiverNumber: '',
        message: 'Test Message'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.receiverNumber)
          .to.equal(`Receiver\'s phone number is required`);
        done();
      });
  });

  it(`should not send a message if sender's number does not exist`, (done) => {
    request.post('/api/v1/sms')
      .send({
        senderNumber: '08167086899',
        receiverNumber: '123456789',
        message: 'Test Message'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.detail)
          .to.equal(`Cannot find the sender's phone number`);
        done();
      });
  });

  it(`should not allow a user that does not exist view their sent messages`, (done) => {
    request.get('/api/v1/sent_messages/5c33aec47a51821bb2d8adac')
      .end((error, response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.detail)
          .to.equal(`Cannot find a Contact with that Id`);
        done();
      });
  });

  it(`should not allow a user that does not exist view their recieved messages`, (done) => {
    request.get('/api/v1/received_messages/5c33aec47a51821bb2d8adac')
      .end((error, response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.detail)
          .to.equal(`Cannot find a Contact with that Id`);
        done();
      });
  });

  it('should successfully register a contact', (done) => {
    request.post('/api/v1/contact/register')
      .send({
        name: 'Test',
        phoneNumber: '08167086899'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should successfully register another contact', (done) => {
    request.post('/api/v1/contact/register')
      .send({
        name: 'Test',
        phoneNumber: '08052318104'
      })
      .end((error, response) => {
        console.log(response.body.data.contact.id)
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it(`should allow a user send an sms with the correct details`, (done) => {
    request.post('/api/v1/sms')
      .send({
        senderNumber: '08167086899',
        receiverNumber: '08052318104',
        message: 'Test Message'
      })
      .end((error, response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.data.status).to.equal('Delivered');
        done();
      });
  });

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
