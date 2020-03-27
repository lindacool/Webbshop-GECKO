const mocha = require('mocha')

const request = require('supertest')

const router = require('../router/userProfileRouting')


describe('adding to cart', ()=>{
    const {User} = require('../model/userModel')

    beforeEach(()=>{
        
    })

    it('should add an item to cart',  (done)=>{

        request(router).post('/cart/5e7a128293261209b05821fa', User.addToCart()).expect(200, nodeodone)

    })

})