const mocha = require('mocha')

const request = require('supertest')

describe('Using Express', ()=>{
let server;

    beforeEach(()=>{
        server = require('../index')
    })

    it('should respond to /',  (done)=>{

        request(server).get('/').expect(200, done)

    })

    it('Should do a 404 on non existing page',(done)=>{
        request(server)
        .get('/pagethatdoesntexist')
        .expect(404, done)
    })

})