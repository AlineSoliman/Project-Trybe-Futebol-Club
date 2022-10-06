import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa login', () => {

  describe('Testa se há usuário', () => {
  
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    });

    after(async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Verifica retorno de status como usuário inexistente', async () => {
      const response: Response = await chai.request(app).post('/login').send({
          email: 'email@email.com',
          password: 'senhasecreta',
        });

        expect(response.status).to.be.equal(401);
    });

  });


    describe('Verifica se o login é realizado', () => {
  
      before(async () => {
        sinon.stub(UserModel, 'findOne').resolves({
            email: 'email@email.com',
            password: 'senhasecreta'
          } as UserModel);
      });
  
      after(async () => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });
  
      it ('Verifica se retorna um token com status 200', async () => {
        const response: Response = await chai.request(app).post('/login').send({
            email: 'email@email.com',
            password: 'senhasecreta',
          });
  
        expect(response.status).to.be.equal(200);
      });
    });
  
    
    describe('Verifica se existe dados de login com erros', () => {
  
      it('Verifica se retorna erro com status 400', async () => {
        const response: Response = await chai.request(app).post('/login');
  
        expect(response.status).to.be.equal(400);
      });
    });
  
    describe('Verifica campos com strings vazias', () => {
  
      it('Verifica se retorna erro com status 400', async () => {
        const response: Response = await chai.request(app).post('/login').send({
            email: '',
            password: '',
          });

        expect(response.status).to.be.equal(400);
      });
  
    });
  
    describe('Testa se usuário não forneceu senha senha', () => {
  
      before(async () => {
        sinon.stub(UserModel, 'findOne').resolves({
            email: 'email@email.com',
            password: 'senhasecreta'
          } as UserModel);
      });
  
      after(async () => {
        (UserModel.findOne as sinon.SinonStub).restore();
      });
  
      it('Verifica se retorna erro com status 401', async () => {
        const response: Response = await chai.request(app).post('/login').send({
            email: 'email@email.com',
            password: '',
          });
  
          expect(response.status).to.be.equal(400);
      });

      describe('Verifica caso não seja passado os dados do usuário para login', () => {

        it('Verifica se retorna status 400', async () => {
          const response: Response = await chai.request(app).post('/login');
    
          expect(response.status).to.be.equal(400);
          expect(response.body.message).to.be.equal('All fields must be filled');
        });
    
      });
      describe('Testa se o token é undefined', () => {

        it('Verifica se retorna um status 404', async () => {
    
          const response: Response = await chai.request(app).get('/login/validate')
    
          expect(response.status).to.be.equal(404);
          expect(response.body.message).to.be.equal('Token not found.');
        });
      });
  
    });
  });

