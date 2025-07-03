const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite( 'POST /api/issues/{project} =>', ( ) => {

      test( 'Create an issue with every field', ( done ) => {
        chai.request( server )
          .post( '/api/issues/test' )
          .send( {
            issue_title : 'Title',
            issue_text  : 'Text',
            created_by  : 'You',
            assigned_to : 'Me',
            status_text : 'To update'
          } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.property( res.body, '_id' );
            assert.property( res.body, 'issue_title' );
            assert.include( res.body['issue_title'], 'Title' );
            assert.property( res.body, 'issue_text'  );
            assert.include( res.body['issue_text'], 'Text' );
            assert.property( res.body, 'created_by' );
            assert.include( res.body['created_by'], 'You' );
            assert.property( res.body, 'assigned_to' );
            assert.include( res.body['assigned_to'], 'Me' );
            assert.property( res.body, 'status_text' );
            assert.include( res.body['status_text'], 'To update' );
            assert.property( res.body, 'open');
            assert.isTrue( res.body['open'] );
            firstId = res.body._id;
            done( );
          } );
      } );

      test( 'Create an issue with only required fields', ( done ) => {
        chai.request( server )
          .post( '/api/issues/test' )
          .send( {
            issue_title : 'Required fields',
            issue_text  : 'Text',
            created_by  : 'You',
          } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.property( res.body, '_id' );
            assert.property( res.body, 'issue_title' );
            assert.include( res.body['issue_title'], 'Required fields' );
            assert.property( res.body, 'issue_text' );
            assert.include( res.body['issue_text'], 'Text' );
            assert.property( res.body, 'created_by' );
            assert.include( res.body['created_by'], 'You' );
            assert.property( res.body, 'assigned_to' );
            assert.include( res.body['assigned_to'], '' );
            assert.property( res.body, 'status_text' );
            assert.include( res.body['status_text'], '' );
            assert.property( res.body, 'open' );
            assert.isTrue( res.body['open'] );
            assert.property( res.body, 'created_on' );
            assert.property( res.body, 'updated_on' );
            done( );
          } );
      } );

    test('Create an issue with missing required fields', (done) => {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_text: 'text',
          created_by: 'Me',
          assigned_to: 'You',
          status_text: 'To update'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.include(res.text, 'required field(s) missing');
          done();
        })
    });

    });


    suite( 'GET /api/issues/{project} =>', ( ) => {
      
      test( 'View issues on a project', ( done ) => {
        chai.request( server )
          .get( '/api/issues/test' )
          .query( { } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.isArray( res.body );
            assert.property( res.body[0], '_id' );
            assert.property( res.body[0], 'issue_title' );
            assert.property( res.body[0], 'issue_text' );
            assert.property( res.body[0], 'assigned_to' );
            assert.property( res.body[0], 'status_text' );
            assert.property( res.body[0], 'created_by' );
            assert.property( res.body[0], 'created_on' );
            assert.property( res.body[0], 'updated_on' );
            assert.property( res.body[0], 'open' );
            done( );
          } );
      });

      test( 'View issues on project with one filter', ( done ) => {
        chai.request( server )
          .get( '/api/issues/test' )
          .query( { } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.property( res.body[0], 'issue_text' );
            done( );
          } );
      } );

      test( 'View issues on a project with multiple filters', ( done ) => {
        chai.request( server )
          .get( '/api/issues/test' )
          .query( { } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.isArray( res.body );
            assert.property( res.body[0], '_id' );
            assert.property( res.body[0], 'issue_title' );
            assert.property( res.body[0], 'issue_text' );
            assert.property( res.body[0], 'assigned_to' );
            assert.property( res.body[0], 'status_text' );
            assert.property( res.body[0], 'created_by' );
            assert.property( res.body[0], 'created_on' );
            assert.property( res.body[0], 'updated_on' );
            assert.property( res.body[0], 'open' );
            done( );
          } );
      } );



    });

});
