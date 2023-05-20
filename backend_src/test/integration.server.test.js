const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

// describe('Testing /findCountyNOI', () => {
//     before(() => {
//         testNOI = {
//             county_cd: 1
//         }
//     })


// });