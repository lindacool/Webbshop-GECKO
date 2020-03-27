const mocha = require('mocha')

const expect = require('chai').expect;

const Product = require('../model/productModel');

const router = require('../router/detailProductPageRouting');

const request = require('supertest')

 


describe('clicking on a product', ()=>{
    let server;

    beforeEach(()=>{
        server = require('../index')
    })
   
    it('should show a product on detailproductpage ',  (done)=>{
        
        // let product = new Product();

        request(server).get('/products/5e7a128293261209b05821fa')
        .expect(200, done);
    });

});