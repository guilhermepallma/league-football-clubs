import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

const { app } = new App();
const { expect } = chai;

import user from './mocks/user.mock';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

describe('Testa rota de "/login"', () => {

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(user as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Realiza login com sucesso.', async () => { 
    chai.request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });
  })

  it('Campo não preenchido.', async () => { 
    chai.request(app)
    .post('/login')
    .send({
      "password": "secret_user"
    }).then((response) => {
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.equal({ message: 'All fields must be filled' });
    });
  })

  it('Email ou senha não existe.', async () => { 
    chai.request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin_user"
    }).then((response) => {
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.equal({ message: 'Incorrect email or password' });
    });
  })
})
