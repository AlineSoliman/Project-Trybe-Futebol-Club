import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/teamsModel';

import { Response } from 'superagent';
import teams from './mockTeam';
import match from './mockMatch';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota GET /matches', () => {

  describe('Testa em caso de erro no servidor', () => {

    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .rejects();
    });

    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Verifica se retorna um erro com status 500', async () => {
      const response: Response = await chai
        .request(app)
        .get('/matches')
      
      expect(response.status).to.be.equal(500);
    });

  });
  });

    before(async () => {
      sinon
        .stub(Team, 'findAndCountAll')
        .resolves({
          rows: [teams[0], teams[1]] as Team[],
          count: 2,
        });

      sinon
        .stub(Match, 'create')
        .resolves({
          id: 1,
        } as Match);
    });

    after(async () => {
      (Team.findAndCountAll as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('Verifica se retorna a partida criada', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0wF-irfFF3ggBs0c";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send({
          homeTeam: 1,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.keys('id', 'homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals', 'inProgress')
      expect(response.body.inProgress).to.be.true;
    }); 


  describe('Testa criação de partida com erro semântico no corpo da requisição', () => {

    it('Verifica se retorna erro com status 422', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0wF-irfFF3ggBs0c";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send({
          homeTeam: 'um',
          awayTeam: 'um',
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });
      
      expect(response.status).to.be.equal(422);
    }); 

  });

  describe('Testa criação de partida propriedade inProgress = false', () => {

    it('Verifica se retorna erro com status 400', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0wF-irfFF3ggBs0c";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send({
          homeTeam: 1,
          awayTeam: 1,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: false
        });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('InProgress must be true.');
    }); 

  });

  describe('Testa criação de partida com times que não existem', () => {

    before(async () => {
      sinon
        .stub(Team, 'findAndCountAll')
        .resolves({
          rows: [teams[0]] as Team[],
          count: 1,
        });
    });

    after(async () => {
      (Team.findAndCountAll as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro com status 404', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0wF-irfFF3ggBs0c";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send({
          homeTeam: 1,
          awayTeam: 895,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no team with such id!');
    }); 

  });

  describe('Testa criação de partida com times iguais', () => {

    it('Verifica se retorna erro com status 401', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0wF-irfFF3ggBs0c";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send({
          homeTeam: 1,
          awayTeam: 1,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal("It is not possible to create a match with two equal teams");
    }); 

  });

  describe('Testa criação de partida com token inexistente', () => {

    it('Verifica se retorna erro com status 404', async () => {
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: 1,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Token not found.');
    }); 

  });

  describe('Testa criação de partida com token inválido', () => {

    it('Verifica se retorna erro com status 401', async () => {
      const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY1NDA4MjE2fQ.BpFpRg7OuiekqQDOWj5Q7qCJg5H0w";
      const response: Response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', wrongToken)
        .send({
          homeTeam: 1,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    }); 

  });

describe('Testa a rota PATCH /matches/:id/finish', () => {

  describe('Testa em caso de sucesso', () => {

    before(async () => {
      sinon
        .stub(Match, 'findByPk')
        .resolves(match as any as Match);

      sinon
        .stub(Match, 'update')
        .resolves();
    });

    after(async () => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Verifica se retorna a partida finalizada', async () => {
      const response: Response = await chai
        .request(app)
        .patch('/matches/1/finish')
      
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Finished')
    });

  });

  describe('Testa se retorna partida inexistente', () => {

    before(async () => {
      sinon
        .stub(Match, 'findByPk')
        .resolves(null);
    });

    after(async () => {
      (Match.findByPk as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro ', async () => {
      const response: Response = await chai
        .request(app)
        .patch('/matches/99/finish')
      
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Match not found.');
    });

  });

  describe('Testa caso de erro no servidor', () => {

    before(async () => {
      sinon
        .stub(Match, 'findByPk')
        .rejects();
    });

    after(async () => {
      (Match.findByPk as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro', async () => {
      const response: Response = await chai
        .request(app)
        .patch('/matches/99/finish')
      
      expect(response.status).to.be.equal(500);
    });

  });

});

describe('Testa a rota PATCH /macthes/:id', () => {

  describe('Verifica em caso de sucesso', () => {

    before(async () => {
      sinon
        .stub(Match, 'findByPk')
        .resolves(match as any as Match);

      sinon
        .stub(Match, 'update')
        .resolves();
    });

    after(async () => {
      (Match.findByPk as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Verifica se retorna ok', async () => {
      const response: Response = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1,
        });

      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Match results updated!');
    });

  });

  describe('Verifica em caso de partida inexistente', () => {

    before(async () => {
      sinon
        .stub(Match, 'findByPk')
        .resolves(null);
    });

    after(async () => {
      (Match.findByPk as sinon.SinonStub).restore();
    });

    it('Verifica se retorna erro com status 404', async () => {
      const response: Response = await chai
        .request(app)
        .patch('/matches/99')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1,
        })
      
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Match not found.');
    });

  });


});