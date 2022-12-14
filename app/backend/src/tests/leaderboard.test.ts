import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

const { app } = new App();
const { expect } = chai;

import leaderboard, { leaderboardAway, leaderboardHome } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

describe('Testa rota de "/leaderboard"', () => {

  it('Classificação geral', () => {
    chai.request(app)
    .get('/leaderboard')
    .then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal(leaderboard);
    });
  });

  it('Classificação dos times da casa', () => {
    chai.request(app)
    .get('/leaderboard/home')
    .then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal(leaderboardHome);
    });
  });

  it('Classificação dos times fora de casa', () => {
    chai.request(app)
    .get('/leaderboard/home')
    .then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal(leaderboardAway);
    });
  });
})