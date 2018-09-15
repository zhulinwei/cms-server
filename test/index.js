const assert = require('assert');
const server = require('../src/server');
const request = require('supertest');

describe('加法函数的测试', async function() {
  // let agent;
  // before(async function(){
  //   const app = await server.start();
  //   
  //   agent = request.agent(app.listen(3452))
  //   console.log('啦啦啦')
  //   console.log(agent);
  //   const a = agent.get('/');
  //   console.log(a)
  // })
  // const app = await server.start();
  // app.listen(3452)
  // agent = request.agent(app)

  it('1加1应该等于2', () => {
    
    //agent.get('/').expect(404)
    console.log('嘿嘿嘿')
    // assert.equal(add(1, 1), 2);
  });

  // it('任何数加0都应该等于自身', () => {
  //   // assert.equal(add(1, 0), 1);
  // })
})
