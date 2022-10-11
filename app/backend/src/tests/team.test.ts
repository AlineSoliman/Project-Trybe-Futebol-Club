import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teamsModel';

import { Response } from 'superagent';

import teams from './mockTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota GET /teams', () => {

  describe('Testa a listagem de todos os times', () => {

    before(async () => {
      sinon
        .stub(Team, 'findAll')
        .resolves(teams as Team[]);
    });

    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Testa se retorna um array de times corretamente', async () => {
      const response: Response = await chai
        .request(app)
        .get('/teams');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    });

  });

  describe('Testa em caso de erro no servidor', () => {

    before(async () => {
      sinon
        .stub(Team, 'findAll')
        .rejects();
    });

    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro', async () => {
      const response: Response = await chai
        .request(app)
        .get('/teams');
      
      expect(response.status).to.be.equal(500);
    });

  });

});

describe('Testa a rota GET /teams/:id', () => {

  describe('Testa se retorna com sucesso', () => {

    before(async () => {
      sinon
        .stub(Team, 'findOne')
        .resolves(teams[0] as Team);
    });

    after(async () => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('Verifica se retorna com sucesso', async () => {
      const response: Response = await chai
        .request(app)
        .get('/teams/1');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.keys('id', 'teamName');
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.include(teams[0]);
    });

  });

  describe('Verifica o caso de time inexistente', () => {

    before(async () => {
      sinon
        .stub(Team, 'findOne')
        .resolves(null);
    });

    after(async () => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro', async () => {
      const response: Response = await chai
        .request(app)
        .get('/teams/999');

      expect(response.status).to.be.equal(404);
    });

  });

  describe('Testa em caso de erro no servidor', () => {

    before(async () => {
      sinon
        .stub(Team, 'findOne')
        .rejects();
    });

    after(async () => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro', async () => {
      const response: Response = await chai
        .request(app)
        .get('/teams/5');

      expect(response.status).to.be.equal(500);
    });

  });

});