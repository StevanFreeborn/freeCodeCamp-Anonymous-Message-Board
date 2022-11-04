import chaiHttp from 'chai-http';
import chai, { assert } from 'chai';
import server from '../server.js';
import Board from '../models/board.js';
import Thread from '../models/thread.js';
import Reply from '../models/reply.js';

chai.use(chaiHttp);

suite('Functional Tests', function () {
    after(async () => {
        await Board.deleteMany({}).exec();
        await Thread.deleteMany({}).exec();
        await Reply.deleteMany({}).exec();
    });

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
            assert.isObject(res.body, 'body is not an object.');
            assert.property(res.body, '_id','response does not contain an _id property');
            assert.property(res.body, 'text', 'response does not contain a text property');
            assert.property(res.body, 'created_on', 'response does not contain a create_on property');
            assert.property(res.body, 'bumped_on', 'response does not contain a bumped_on property');
            assert.equal(res.body.created_on, res.body.bumped_on, 'responses bumped_on and created_on property are not the same');
            assert.property(res.body, 'delete_password', 'response does not contain a delete_password property');
            assert.property(res.body, 'replies', 'response does not contain a replies property');
            done();
        });
    });

    test('Can view 10 most recent threads with 3 replies each', done => {
        assert.fail();
    });

    test('Can not delete a thread with incorrect password', done => {
        assert.fail();
    });

    test('Can delete a thread with correct password', done => {
        assert.fail();
    });

    test('Can report a thread', done => {
        assert.fail();
    });

    test('Can create a reply to a thread', done => {
        assert.fail();
    });

    test('Can view a thread and all its replies', done => {
        assert.fail();
    });

    test('Can not delete a reply with inccorect password', done => {
        assert.fail();
    });

    test('Can delete a reply with correct password', done => {
        assert.fail();
    });

    test('Can report a reply', done => {
        assert.fail();
    });
});
