const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Can create a new thread', done => {

    });

    test('Can view 10 most recent threads with 3 replies each', done => {

    });

    test('Can not delete a thread with incorrect password', done => {

    });

    test('Can delete a thread with correct password', done => {

    });

    test('Can report a thread', done => {

    });

    test('Can create a reply to a thread', done => {

    });

    test('Can view a thread and all its replies', done => {

    });

    test('Can not delete a reply with inccorect password', done => {

    });

    test('Can delete a reply with correct password', done => {

    });

    test('Can report a reply', done => {
        
    });
});
