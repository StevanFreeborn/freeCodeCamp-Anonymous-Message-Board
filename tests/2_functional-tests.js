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
    const testReplyText = 'this is a reply';

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

            assert.equal(res.status, 201, 'status code is not 201');
            assert.isObject(res.body, 'body is not an object');
            assert.property(res.body, 'board', 'response does not have board property');
            assert.property(res.body, '_id','response does not have _id property');
            assert.property(res.body, 'text', 'response does not have text property');
            assert.property(res.body, 'created_on', 'response does not have created_on property');
            assert.property(res.body, 'bumped_on', 'response does not have bumped_on property');
            assert.equal(res.body.created_on, res.body.bumped_on, 'responses bumped_on and created_on property are not the same');
            assert.property(res.body, 'delete_password', 'response does not have delete_password property');
            assert.property(res.body, 'reported', 'response does not have reported property');
            assert.property(res.body, 'replies', 'response does not have replies property');
            done();
        });
    });

    test('Can create a reply to a thread', done => {
        chai.request(server)
        .post(`/api/threads/${testBoardName}`)
        .type('form')
        .send({
            text: testThreadText,
            delete_password: testPassword,
        })
        .end((err, res) => {
            if (err) console.log(err);

            const threadId = res.body._id;

            chai.request(server)
            .post(`/api/replies/${testBoardName}`)
            .type('form')
            .send({
                thread_id: threadId,
                text: testReplyText,
                delete_password: testPassword,
            })
            .end((err, res) => {
                if (err) console.log(err);

                assert.equal(res.status, 201, 'status code is not 201');
                assert.isObject(res.body, 'body is not an object');
                assert.property(res.body, 'thread', 'response does not have thread property');
                assert.property(res.body, '_id','response does not have _id property');
                assert.property(res.body, 'text', 'response does not have text property');
                assert.property(res.body, 'created_on', 'response does not have created_on property');
                assert.property(res.body, 'bumped_on', 'response does not have bumped_on property');
                assert.equal(res.body.created_on, res.body.bumped_on, 'responses bumped_on and created_on property are not the same');
                assert.property(res.body, 'delete_password', 'response does not have delete_password property');
                assert.property(res.body, 'reported', 'response does not have reported property');
                done();
            });
        });
    });

    test('Can view 10 most recent threads with 3 replies each', done => {
        assert.fail();
        // TODO: Create 11 threads with 5 replies each as fake setup data. Probably just createTestData() function

        // chai.request(server)
        // .get(`/api/threads/${testBoardName}`)
        // .end((err, res) => {
        //     if (err) console.log(err);

        //     assert.equal(res.status, 200);

        //     const threads = res.body;

        //     assert.isArray(threads, 'body is not an array');
        //     assert.isAtMost(threads.length, 10, 'more than 10 threads returned');
            
        //     threads.forEach(thread => {
        //         assert.isObject(thread, 'thread is not an object');
        //         assert.property(thread, '_id', 'thread does not have _id property');
        //         assert.property(thread, 'text', 'thread does not have text property');
        //         assert.property(thread, 'created_on', 'thread does not have created_on property');
        //         assert.property(thread, 'bumped_on', 'thread does not have bumped_on property');
        //         assert.notProperty(thread, 'reported', 'thread does have reported property');
        //         assert.notProperty(thread, 'delete_password', 'thread does have delete_password property');
        //         assert.property(thread, 'replies', 'response does not have replies property');

        //         const replies = thread.replies;

        //         assert.isArray(replies, 'replies is not an array');
        //         assert.isAtMost(replies.length, 3, 'more than 3 replies returned');

        //         replies.forEach(reply => {
        //             assert.property(reply, 'text', 'reply does not have text property');
        //             assert.notProperty(reply, 'reported', 'reply does have reported property');
        //             assert.notProperty(reply, 'delete_password', 'reply does have delete_password property');
        //         });
        //     });
        // });

        // done();
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
