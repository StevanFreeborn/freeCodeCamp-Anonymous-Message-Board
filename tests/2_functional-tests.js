const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    const testBoardName = 'test';
    const testThreadText = 'this is a thread';
    const testPassword = 'password';

    test('Can create a new thread', done => {
        chai.request(server)
        .post(`/api/threads/${testBoardName}`)
        .type('form')
        .send({
            text: testThreadText,
            delete_password: testPassword,
        })
        .end((err, res) => {
            if (err) console.log(err);

            assert.equal(res.status, 201);
            assert.isObject(res.body, message='body is not an object.');
            assert.property(res.body, '_id', message='response does not contain an _id property');
            assert.property(res.body, 'text', message='response does not contain a text property');
            assert.property(res.body, 'created_on', message='response does not contain a create_on property');
            assert.property(res.body, 'bumped_on', message='response does not contain a bumped_on property');
            assert.equal(res.body.created_on, res.body.bumped_on, message='responses bumped_on and created_on property are not the same');
            assert.property(res.body, 'delete_password', message='response does not contain a delete_password property');
            assert.property(res.body, 'replies', message='response does not contain a replies property');
        });
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
