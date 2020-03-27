const mocha = require('mocha')
const expect = require('chai').expect;
const request = require('supertest')

const Product = require('../model/productModel');

const router = require('../router/adminPageRouting');

const model = require('../model/userModel');
 


describe('create new product', ()=>{
    // const {addToCart} = require('../model/userModel')


    it('should be invalid if value is empty ',  (done)=>{
        let product = new Product();

        product.validate(function(err) {
            expect(err.errors.title).to.exist;
            expect(err.errors.imgUrl).to.exist;
            expect(err.errors.description).to.exist;
            expect(err.errors.price).to.exist;
            done();
        });

    });

});

describe('not access to adminPage', ()=>{
    
    const server = require('../index')
    

    
        it('Should not do a 401',(done)=>{
            request(server)
            .get('/admin')
            .expect(200, done)
        })
    
    })